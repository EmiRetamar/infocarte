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
	cartelerasForProfesores: Cartelera[] = new Array();
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
									this.getCartelerasForProfesores(this.profesores);
									/* Cuando la funcion anonima tiene una sola sentencia se puede expresar
									sin llaves ni punto y coma */
									/* "setTimeout()" recibe como parametro una funcion anonima y un valor
									que representa el tiempo expresado en milisegundos. Este tiempo es el que
									se espera para que se ejecuten las sentencias de la funcion anonima */
									setTimeout(() => this.loaded = true, 1000);
								}, 2000);
							}
						);
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

	getCartelerasForProfesores(profesores: Usuario[]): void {
		for (let profesor of profesores) {
			this.requestCartelerasForProfesor(profesor);
		}
	}

	requestCartelerasForProfesor(profesor: Usuario) {
		// Se inicializa el arreglo que va a guardar las carteleras que tiene permiso el profesor
		/* Es un arreglo bidimensional donde el arreglo principal (la fila) representara a un profesor
		y el arreglo secundario (la columna) representara una cartelera a la que tiene permiso el profesor */
		this.cartelerasForProfesores[profesor.id] = new Array();
		// Se obtienen los permisos del profesor
		this.userService.getPermissions(profesor.id)
			.subscribe(
				(permissions) => {
					for (let permission of permissions) {
						/* Se obtienen las carteleras a las que tiene permisos el profesor, cada permiso
						corresponde a una cartelera en la que tiene permisos */
						this.userService.getBillboardForPermission(permission.id)
							.subscribe(
								(cartelera: Cartelera) => {
									/* Cada profesor va a tener permisos en una o muchas carteleras
									por lo tanto las carteleras a las que tiene permiso cada profesor
									se guardan en una matriz donde los indices son el "id" del profesor
									y el "id" de la cartelera a la que tiene permiso */
									this.cartelerasForProfesores[profesor.id][cartelera.id] = cartelera;
								}
							);
					}
				}
			);
	}

	hasPermissions(profesor: Usuario) {
		/* Si el profesor actual tiene permisos en la cartelera actual se obtendra un valor
		diferente de undefined (la cartelera actual) por lo tanto la expresion booleana retorna true
		caso contrario, retorna false */
		return (this.cartelerasForProfesores[profesor.id][this.cartelera.id] != undefined);
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
