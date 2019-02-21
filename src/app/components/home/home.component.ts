import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { VerSeguidoresComponent } from './ver-seguidores/ver-seguidores.component';
import { DeleteCarteleraComponent } from './delete-cartelera/delete-cartelera.component';
import { CarteleraService } from '../../services/cartelera.service';
import { UserService } from '../../services/user.service';
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
    cartelerasSeguidas: any[] = [];

    constructor(private carteleraService: CarteleraService,
                private userService: UserService,
                private router: Router,
                private dialog: MatDialog,
                private toasterService: ToasterService,
                private localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.carteleraService.getCarteleras()
            .subscribe(
                (carteleras) => {
                    this.userService.getCartelerasSeguidas(this.localStorageService.getUserId())
                        .subscribe(
                            (cartelerasSeguidas) => {
                                this.carteleras = carteleras;
                                this.cartelerasSeguidas = cartelerasSeguidas;
                            }
                        );
                }
            );
    }

    verSeguidores(cartelera) {
        const dialogConfig = new MatDialogConfig();

        //dialogConfig.height = '12em';
        //dialogConfig.width = '15em';
        dialogConfig.data = {
            id: cartelera.id,
            dialogRef: this.dialog
        };

        this.dialog.open(VerSeguidoresComponent, dialogConfig);
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

    followAction(carteleraActual) {
        let unfollow = true;
        let idUser = this.localStorageService.getUserId();
        // Si se encuentra la cartelera clickeada en la coleccion cartelerasSeguidas significa que fue un unfollow
        if (this.followed(carteleraActual, unfollow)) {
            // Llamada a la api para eliminar el follow de la cartelera para el usuario actual
            this.carteleraService.unfollow(idUser, carteleraActual.id)
                .subscribe(
                    (result) => {
                        return;
                    },
                    (error) => {
                        // Si ocurre un error en el servidor, la cartelera es agregada nuevamente a la coleccion cartelerasSeguidas
                        this.cartelerasSeguidas.push(carteleraActual);
                        this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                    }
                );
        }
        // Si no se encuentra la cartelera clickeada en la coleccion cartelerasSeguidas significa que fue un follow
        else {
            this.carteleraService.follow(idUser, carteleraActual.id)
                .subscribe(
                    (result) => {
                        // Si el follow se produce correctamente en la api, se agrega la cartelera a la coleccion local cartelerasSeguidas
                        this.cartelerasSeguidas.push(carteleraActual);
                        return;
                    },
                    (error) => {
                        this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                    }
                );
        }
    }

    // Verifica si una cartelera esta followed, tambien efectua un unfollow en caso de que se llame desde followAction, esto significa que se produjo un click en "Dejar de seguir" sobre una cartelera followed
    followed(carteleraActual, unfollow?: boolean): boolean {
        for (let carteleraSeguida of this.cartelerasSeguidas) {
            if (this.equals(carteleraSeguida, carteleraActual)) {
                if(unfollow)
                    this.removeCartelera(this.cartelerasSeguidas, carteleraSeguida);
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
