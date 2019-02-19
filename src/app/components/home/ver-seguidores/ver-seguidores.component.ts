import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../services/user.service';

@Component({
  	selector: 'info-ver-seguidores',
  	templateUrl: './ver-seguidores.component.html',
  	styleUrls: ['./ver-seguidores.component.css']
})
export class VerSeguidoresComponent implements OnInit {

	idCartelera: string;
	seguidores;

  	constructor(@Inject(MAT_DIALOG_DATA) data: any, private userService: UserService) {
		this.idCartelera = data.id;
	}

	ngOnInit() {
		this.userService.getSeguidores(this.idCartelera)
			.subscribe(
				(seguidores) => {
					this.seguidores = seguidores;
				}
			)
  	}

}
