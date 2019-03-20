import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { VerSeguidoresComponent } from './ver-seguidores/ver-seguidores.component';
import { DeleteCarteleraComponent } from './delete-cartelera/delete-cartelera.component';
import { CarteleraService } from '../../services/cartelera.service';
import { UserService } from '../../services/user.service';
import { ToasterService } from '../../services/toaster.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Cartelera } from '../../models/cartelera';

@Component({
    selector: 'info-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    carteleras: Cartelera[];
    cartelerasSeguidas: Cartelera[] = [];

    constructor(private carteleraService: CarteleraService,
                private userService: UserService,
                private dialog: MatDialog,
                private toasterService: ToasterService,
                private localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.carteleraService.getCarteleras()
            .subscribe(
                (carteleras) => {
                    this.carteleras = carteleras;
                    if (this.localStorageService.getToken()) {
                        this.userService.getCartelerasSeguidas(this.localStorageService.getUserId())
                            .subscribe(
                                (cartelerasSeguidas) => this.cartelerasSeguidas = cartelerasSeguidas
                            );
                    }
                }
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
                                () => {
                                    this.removeCartelera(this.carteleras, cartelera);
                                    this.toasterService.success('Cartelera eliminada con éxito !');
                                },
                                (error) => {
                                    if (error.status == 409)
                                        this.toasterService.info('No se puede eliminar esta cartelera porque tiene publicaciones o seguidores');
                                    else
                                        this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
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

    followAction(carteleraActual: Cartelera) {
        let unfollow = true;
        let idUser = this.localStorageService.getUserId();
        if (this.followed(carteleraActual, unfollow)) {
            this.carteleraService.unfollow(idUser, carteleraActual.id)
                .subscribe(
                    () => {
                        this.removeCartelera(this.cartelerasSeguidas, carteleraActual);
                        return;
                    },
                    (error) => {
                        this.cartelerasSeguidas.push(carteleraActual);
                        this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                        console.error(error.message);
                    }
                );
        }
        else {
            this.carteleraService.follow(idUser, carteleraActual.id)
                .subscribe(
                    () => {
                        this.cartelerasSeguidas.push(carteleraActual);
                        return;
                    },
                    (error) => {
                        this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                        console.error(error.message);
                    }
                );
        }
    }

    followed(carteleraActual: Cartelera, unfollow?: boolean): boolean {
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
