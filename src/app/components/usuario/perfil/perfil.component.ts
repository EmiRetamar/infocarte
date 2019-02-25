import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/usuario';

@Component({
	selector: 'info-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

	user: Usuario;

	constructor(private userService: UserService,
				private router: Router,
				private route: ActivatedRoute) { }

	ngOnInit() {
		let idUser: string;
		idUser = this.route.snapshot.paramMap.get('idUser');
		this.userService.getUserById(idUser)
			.subscribe(
				(user: Usuario) => {
					this.user = user;
				}
			);
	}

}
