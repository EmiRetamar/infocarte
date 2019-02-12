import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteCarteleraComponent } from './delete-cartelera/delete-cartelera.component';
import { CarteleraService } from '../../services/cartelera.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { Cartelera } from '../../models/cartelera';

@Component({
    selector: 'info-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    carteleras: any[];
    cartelerasLikeadas: any[] = [];

    constructor(private carteleraService: CarteleraService,
                private router: Router,
                private dialog: MatDialog,
                private toasterService: ToasterService,
                public localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.carteleraService.getCarteleras()
            .subscribe(
                (carteleras) => {
                    this.carteleras = carteleras;
                }
            );
    }

    eliminarCartelera(cartelera: any) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        //dialogConfig.height = '12em';
        //dialogConfig.width = '15em';
        // Estos datos son pasados al componente "DeleteCarteleraComponent"
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
                                (res) => {
                                    this.removeCartelera(this.carteleras, cartelera);
                                    this.toasterService.success('Cartelera eliminada con éxito !');
                                },
                                (error) => {
                                    this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                                }
                            );
                    }
                }
            );
    }

    removeCartelera(carteleras: any[], cartelera: any) {
        let index = carteleras.indexOf(cartelera);
        if (index > -1) {
            carteleras.splice(index, 1);
        }
    }

    likeAction(carteleraActual) {
        let dislike = true;
        // Si se encuentra la cartelera clickeada en la coleccion cartelerasLikeadas significa que fue un dislike
        if (this.likeada(carteleraActual, dislike)) {
            // Llamada a la api para eliminar el like de la cartelera para el usuario actual
            this.carteleraService.dislike(carteleraActual)
                .subscribe(
                    (result) => {
                        return;
                    },
                    (error) => {
                        // Si ocurre un error en el servidor, la cartelera es agregada nuevamente a la coleccion cartelerasLikeadas
                        this.cartelerasLikeadas.push(carteleraActual);
                        this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                    }
                );
        }
        // Si no se encuentra la cartelera clickeada en la coleccion cartelerasLikeadas significa que fue un like
        else {
            this.carteleraService.like(carteleraActual)
                .subscribe(
                    (result) => {
                        // Si el like se produce correctamente en la api, se agrega la cartelera a la coleccion local cartelerasLikeadas
                        this.cartelerasLikeadas.push(carteleraActual);
                        return;
                    },
                    (error) => {
                        this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                    }
                );
        }
        console.log(this.cartelerasLikeadas);
    }

    // Verifica si una cartelera esta likeada, tambien efectua un dislike en caso de que se llame desde likeAction, esto significa que se produjo un click en "like" sobre una cartelera likeada, lo que produce como resultado un "dislike"
    likeada(carteleraActual, dislike?: boolean): boolean {
        for (let carteleraLikeada of this.cartelerasLikeadas) {
            if (this.equals(carteleraLikeada, carteleraActual)) {
                if(dislike)
                    this.removeCartelera(this.cartelerasLikeadas, carteleraLikeada);
                return true;
            }
        }
        return false;
    }

    equals(x, y) {
        if ( x === y ) return true;
        // if both x and y are null or undefined and exactly the same

        if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
            // if they are not strictly equal, they both need to be Objects

        if ( x.constructor !== y.constructor ) return false;
            // they must have the exact same prototype chain, the closest we can do is
            // test there constructor.

        for ( var p in x ) {
            if ( ! x.hasOwnProperty( p ) ) continue;
            // other properties were tested using x.constructor === y.constructor

            if ( ! y.hasOwnProperty( p ) ) return false;
            // allows to compare x[ p ] and y[ p ] when set to undefined

            if ( x[ p ] === y[ p ] ) continue;
            // if they have the same strict value or identity then they are equal

            if ( typeof( x[ p ] ) !== "object" ) return false;
            // Numbers, Strings, Functions, Booleans must be strictly equal

            if ( ! this.equals( x[ p ],  y[ p ] ) ) return false;
            // Objects and Arrays must be tested recursively
        }

        for ( p in y ) {
            if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
            // allows x[ p ] to be set to undefined
        }
        return true;
    }

}
