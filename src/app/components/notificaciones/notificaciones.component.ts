import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CarteleraService } from '../../services/cartelera.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Notificacion } from '../../models/notificacion';
import { UsuarioNotificaciones } from 'src/app/models/usuario-notificaciones';
import { Post } from '../../models/post';
import { Cartelera } from '../../models/cartelera';

@Component({
	selector: 'info-notificaciones',
	templateUrl: './notificaciones.component.html',
	styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

	notifications = new Array();
	loaded = false;

	constructor(private userService: UserService,
				private carteleraService: CarteleraService,
				private localStorageService: LocalStorageService) { }

	ngOnInit() {
		this.userService.getUserNotifications(this.localStorageService.getUserId())
			.subscribe(
				(userNotifications: UsuarioNotificaciones[]) => {
					this.getNotificaciones(userNotifications);
					/* Se esperan unos segundos para setear en true la variable loaded porque sino queda
					precargado en la vista que el arreglo "notifications" esta vacio (cuando hay notificaciones)
					y se muestra el mensaje de que aun no hay notificaciones durante algunas milesimas de
					segundo hasta que se cargue la vista con el listado de notificaciones */
					setTimeout(() => {
						this.ordenarNotificaciones();
						this.loaded = true;
					}, 2500);
				}
			);
	}

	getNotificaciones(userNotifications: UsuarioNotificaciones[]): void {
		for (let userNotification of userNotifications) {
			this.userService.getNotification(userNotification.id)
				.subscribe((notification: Notificacion) => {
					this.userService.getPostForNotification(notification.id)
						.subscribe((post: Post) => {
							this.carteleraService.getCarteleraForPost(post.id)
								.subscribe((cartelera: Cartelera) => {
									this.notifications.push(
										{
											idNotification: notification.id,
											idUserNotification: userNotification.id,
											idPost: post.id,
											idCartelera: cartelera.id,
											text: notification.text,
											read: userNotification.read
										}
									);
								});
						});
				});
		}
	}

	// Fuente: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/sort
	// Se ordenan las notificaciones de la mas reciente a la mas antigua
	ordenarNotificaciones() {
		this.notifications.sort((a, b) => {
			// Si la funcion anonima devuelve un numero mayor que 0, se sitúa "b" en un indice menor que "a".
			if (a.idNotification < b.idNotification) {
				return 1;
			}
			// Si la funcion anonima devuelve un numero menor que 0, se sitúa "a" en un indice menor que "b"
		  	if (a.idNotification > b.idNotification) {
				return -1;
			}
		});
	}

	leerNotificacion(notification) {
		this.userService.leerNotification(this.localStorageService.getUserId(), notification.idUserNotification)
			.subscribe();
	}

}
