import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { VerSeguidoresComponent } from '../../home/ver-seguidores/ver-seguidores.component';
import { DeleteCarteleraComponent } from '../../home/delete-cartelera/delete-cartelera.component';
import { CarteleraService } from '../../../services/cartelera.service';
import { UserService } from '../../../services/user.service';
import { ToasterService } from '../../../services/toaster.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Cartelera } from '../../../models/cartelera';

@Component({
	selector: 'info-carteleras-creadas',
	templateUrl: './carteleras-creadas.component.html',
	styleUrls: ['./carteleras-creadas.component.css']
})
export class CartelerasCreadasComponent implements OnInit {

	carteleras: Cartelera[];

	constructor(private carteleraService: CarteleraService,
				private userService: UserService,
				private dialog: MatDialog,
				private toasterService: ToasterService,
				private localStorageService: LocalStorageService) { }

	ngOnInit() {
		this.userService.getCartelerasCreadas(this.localStorageService.getUserId())
			.subscribe(
				(cartelerasCreadas) => this.carteleras = cartelerasCreadas
			);
	}

	verSeguidores(cartelera: Cartelera) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.data = {
            id: cartelera.id,
            dialogRef: this.dialog
        };

        this.dialog.open(VerSeguidoresComponent, dialogConfig);
    }

    eliminarCartelera(cartelera: Cartelera) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: cartelera.id,
            title: cartelera.title
        };

        const dialogRef = this.dialog.open(DeleteCarteleraComponent, dialogConfig);

        dialogRef.afterClosed()
            .subscribe(
                (result) => {
                    if (result) {
                        this.carteleraService.deleteCartelera(cartelera.id)
                            .subscribe(
                                () => {
                                    this.removeCartelera(this.carteleras, cartelera);
                                    this.toasterService.success('Cartelera eliminada con éxito !');
                                },
                                (error) => {
                                    this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                                    console.error(error.message);
                                }
                            );
                    }
                }
            );
    }

    removeCartelera(carteleras: Cartelera[], cartelera: Cartelera) {
        let index = carteleras.indexOf(cartelera);
        if (index > -1) {
            carteleras.splice(index, 1);
        }
    }

}
