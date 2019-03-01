import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CarteleraService } from '../../../services/cartelera.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';

@Component({
  	selector: 'info-ver-seguidores',
  	templateUrl: './ver-seguidores.component.html',
  	styleUrls: ['./ver-seguidores.component.css']
})
export class VerSeguidoresComponent implements OnInit {

	idCartelera: string;
	seguidores: Usuario[];
	dialogRef: MatDialog;

	/* {read: ElementRef} es porque es un boton de angular material, si no se especifica esta propiedad
	no es posible acceder a la propiedad "nativeElement" */
	@ViewChild("buttonClose", {read: ElementRef}) buttonClose: ElementRef;

  	constructor(@Inject(MAT_DIALOG_DATA) data: any, private carteleraService: CarteleraService, private router: Router) {
		this.idCartelera = data.id;
		this.dialogRef = data.dialogRef;
	}

	ngOnInit() {
		this.carteleraService.getSeguidores(this.idCartelera)
			.subscribe(
				(seguidores) => this.seguidores = seguidores
			);
  	}

	closeMatDialog() {
		this.dialogRef.closeAll();
	}

}
