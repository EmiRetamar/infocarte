import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CarteleraService } from '../../services/cartelera.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Notificacion } from '../../models/notificacion';
import { UsuarioNotificaciones } from 'src/app/models/usuario-notificaciones';
import { Usuario } from '../../models/usuario';
import { Cartelera } from '../../models/cartelera';
import { Post } from '../../models/post';

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
					setTimeout(() => {
						this.ordenarNotificaciones();
						this.loaded = true;
					}, 5000);
				}
			);
	}

	getNotificaciones(userNotifications: UsuarioNotificaciones[]): void {
		for (let userNotification of userNotifications) {
			this.userService.getNotification(userNotification.id)
				.subscribe((notification: Notificacion) => {
					this.userService.getUserForNotification(notification.id)
						.subscribe((user: Usuario) => {
							this.userService.getPostForNotification(notification.id)
								.subscribe((post: Post) => {
									this.carteleraService.getCarteleraForPost(post.id)
										.subscribe((cartelera: Cartelera) => {
											if (this.localStorageService.getUserId() != user.id) {
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
											}
										});
								});
						});
				});
		}
	}

	ordenarNotificaciones() {
		this.notifications.sort((a, b) => {
			if (a.idNotification < b.idNotification) {
				return 1;
			}
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
