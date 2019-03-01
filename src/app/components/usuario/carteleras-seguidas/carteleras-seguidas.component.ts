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
        if (this.followed(carteleraActual, unfollow)) {
            this.carteleraService.unfollow(idUser, carteleraActual.id)
                .subscribe(
                    (result) => {
                        //this.cartelerasSeguidas.pop(carteleraActual);
                        console.log(result);
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
                    (result) => {
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

	removeCartelera(carteleras: Cartelera[], cartelera: Cartelera) {
        let index = carteleras.indexOf(cartelera);
        if (index > -1) {
            carteleras.splice(index, 1);
        }
    }

    equals(x, y) {
        if ( x === y ) return true;

        if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;

        if ( x.constructor !== y.constructor ) return false;

        for ( var p in x ) {
            if ( ! x.hasOwnProperty( p ) ) continue;

            if ( ! y.hasOwnProperty( p ) ) return false;

            if ( x[ p ] === y[ p ] ) continue;

            if ( typeof( x[ p ] ) !== "object" ) return false;

            if ( ! this.equals( x[ p ],  y[ p ] ) ) return false;
        }

        for ( p in y ) {
            if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
        }
        return true;
    }

}
