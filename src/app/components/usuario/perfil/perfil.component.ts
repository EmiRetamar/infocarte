import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Usuario } from '../../../models/usuario';

@Component({
	selector: 'info-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

	user: Usuario;

	constructor(private userService: UserService,
				private localStorageService: LocalStorageService,
				private router: Router,
				private route: ActivatedRoute) { }

	ngOnInit() {
		let idUser: string;
		idUser = this.route.snapshot.paramMap.get('idUser');
		this.userService.getUserById(idUser)
			.subscribe(
				(user: Usuario) => {
					this.user = user;
					console.log(user.id);
				},
				(error) => {
					if (error.status == 404) {
                        console.log(error.message);
                        this.router.navigateByUrl('/page-not-found');
                    }
				}
			);
		console.log(this.localStorageService.getUserId());
	}

	redirectToCartelerasCreadas() {
		this.router.navigateByUrl('/carteleras-creadas');
	}

	redirectToPostsCreados() {
		this.router.navigateByUrl('/posts-creados');
	}

	redirectToCartelerasSeguidas() {
		this.router.navigateByUrl('/carteleras-seguidas');
	}

}
