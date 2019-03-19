import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Cartelera } from '../../../models/cartelera';
import { Usuario } from '../../../models/usuario';
import { Rol } from '../../../models/rol';
import { CarteleraService } from 'src/app/services/cartelera.service';

@Component({
	selector: 'info-administrar-permisos',
	templateUrl: './administrar-permisos.component.html',
	styleUrls: ['./administrar-permisos.component.scss']
})
export class AdministrarPermisosComponent implements OnInit {

	cartelera: Cartelera;
	profesores: Usuario[] = new Array();
	checked: boolean[] = new Array();
	loaded: boolean;

	constructor(private carteleraService: CarteleraService,
				private userService: UserService,
				private toasterService: ToasterService,
				private router: Router,
				private route: ActivatedRoute,
				public localStorageService: LocalStorageService) { }

	ngOnInit() {
		let idCartelera = this.route.snapshot.paramMap.get('idCartelera');
		this.carteleraService.getCartelera(idCartelera)
			.subscribe(
				(cartelera: Cartelera) => {
					this.userService.getUsers()
						.subscribe(
							(users: Usuario[]) => {
								this.cartelera = cartelera;
								this.obtenerProfesores(users);
								setTimeout(() => {
									this.getCartelerasWithPermissions(this.profesores);
									setTimeout(() => this.loaded = true, 1500);
								}, 1000);
							}
						);
				},
				(error) => {
					if (error.status == 404) {
						console.log(error.message);
						this.router.navigateByUrl('/page-not-found');
					}
				}
			);
	}

	obtenerProfesores(users: Usuario[]) {
		for (let user of users) {
			this.userService.getRoles(user.id)
				.subscribe(
					(roles: Rol[]) => {
						for (let rol of roles) {
							if (rol.roleName == 'PROFESOR')
								this.profesores.push(user);
						}
					}
				);
		}
	}

	getCartelerasWithPermissions(profesores: Usuario[]): void {
		for (let profesor of profesores) {
			this.requestCartelerasWithPermissions(profesor);
		}
	}

	requestCartelerasWithPermissions(profesor: Usuario) {
		this.checked[profesor.id] = false;
		this.userService.getPermissions(profesor.id)
			.subscribe(
				(permissions) => {
					for (let permission of permissions) {
						this.userService.getBillboardForPermission(permission.id)
							.subscribe(
								(cartelera: Cartelera) => {
									if (cartelera.id == this.cartelera.id) {
										this.checked[profesor.id] = true;
									}
								}
							);
					}
				}
			);
	}

	administrarPermisos(event) {
		let idProfesor = event.source.value;
		if (event.checked) {
			this.userService.givePermissions(idProfesor, this.cartelera.id).subscribe();
		}
		else {
			this.userService.removePermissions(idProfesor, this.cartelera.id).subscribe();
		}
	}

	finalizarOperacion() {
		this.router.navigateByUrl(`/cartelera/${this.cartelera.id}`);
		this.toasterService.success('Operacion realizada con éxito !');
	}

}
