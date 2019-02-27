import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CarteleraService } from '../../../services/cartelera.service';
import { ToasterService } from '../../../services/toaster.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Cartelera } from '../../../models/cartelera';

@Component({
	selector: 'info-carteleras-seguidas',
	templateUrl: './carteleras-seguidas.component.html',
	styleUrls: ['./carteleras-seguidas.component.css']
})
export class CartelerasSeguidasComponent implements OnInit {

	carteleras: Cartelera[];
	cartelerasSeguidas: Cartelera[];

	constructor(private userService: UserService,
				private carteleraService: CarteleraService,
				private toasterService: ToasterService,
				private localStorageService: LocalStorageService) { }

	ngOnInit() {
		this.userService.getCartelerasSeguidas(this.localStorageService.getUserId())
			.subscribe(
				(cartelerasSeguidas) => {
					this.carteleras = cartelerasSeguidas;
					this.cartelerasSeguidas = cartelerasSeguidas;
				}
			);
	}

	followAction(carteleraActual: Cartelera) {
        let unfollow = true;
        let idUser = this.localStorageService.getUserId();
        // Si se encuentra la cartelera clickeada en la coleccion cartelerasSeguidas significa que fue un unfollow
        if (this.followed(carteleraActual, unfollow)) {
            // Llamada a la api para eliminar el follow de la cartelera para el usuario actual
            this.carteleraService.unfollow(idUser, carteleraActual.id)
                .subscribe(
                    (result) => {
                        //this.cartelerasSeguidas.pop(carteleraActual);
                        console.log(result);
                        return;
                    },
                    (error) => {
                        // Si ocurre un error en el servidor, la cartelera es agregada nuevamente a la coleccion cartelerasSeguidas
                        this.cartelerasSeguidas.push(carteleraActual);
                        this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                        console.error(error.message);
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
                        console.log(result);
                        return;
                    },
                    (error) => {
                        this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                        console.error(error.message);
                    }
                );
        }
    }

	// Verifica si una cartelera esta followed, tambien efectua un unfollow en caso de que se llame desde followAction, esto significa que se produjo un click en "Dejar de seguir" sobre una cartelera followed
    followed(carteleraActual: Cartelera, unfollow?: boolean): boolean {
        for (let carteleraSeguida of this.cartelerasSeguidas) {
            if (this.equals(carteleraSeguida, carteleraActual)) {
                /* Si esta presente el parametro "unfollow" significa que el usuario realizo un click
                en "seguir/siguiendo" pero como la comprobacion de la variable se ejecuta despues de
                la comparacion de "carteleraSeguida" con "carteleraActual" el metodo "removeCartelera()
                se ejecutara solo en caso de realizar un unfollow ya que al retornar true el metodo equals()
                la cartelera actual es una cartelera seguida por el usuario */

                /* La variable "unfollow" es necesaria porque en el caso de la carga del listado de cartelera
                se llamara al metodo followed() (este metodo) para comprobar si la cartelera que se esta
                cargando en la vista es una cartelera seguida para aplicarle un estilo al boton indicando
                que la cartelera esta followed, entonces si no se usa esta variable cada vez que se cargue
                el listado de carteleras se ejecutara el metodo "removeCartelera()" y se eliminaran
                las carteleras seguidas */
                if(unfollow)
                    this.removeCartelera(this.cartelerasSeguidas, carteleraSeguida);
                return true;
            }
        }
        return false;
	}

	removeCartelera(carteleras: Cartelera[], cartelera: Cartelera) {
        let index = carteleras.indexOf(cartelera);
        if (index > -1) {
            carteleras.splice(index, 1);
        }
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
