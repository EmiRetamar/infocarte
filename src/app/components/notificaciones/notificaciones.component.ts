import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Notificacion } from '../../models/notificacion';
import { UsuarioNotificaciones } from 'src/app/models/usuario-notificaciones';

@Component({
	selector: 'info-notificaciones',
	templateUrl: './notificaciones.component.html',
	styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

	notifications = new Array();
	loaded = false;

	constructor(private userService: UserService,
				private localStorageService: LocalStorageService) { }

	ngOnInit() {
		this.userService.getUserNotifications(this.localStorageService.getUserId())
			.subscribe(
				(userNotifications: UsuarioNotificaciones[]) => {
					this.getNotificaciones(userNotifications);
					/* Se espera 1 segundo para setear en true la variable loaded porque sino queda precargado
					en la vista que el arreglo "notifications" esta vacio (cuando hay notificaciones) y se
					muestra el mensaje de que aun no hay notificaciones durante algunas milesimas de segundo
					hasta que se cargue la vista con el listado de notificaciones */
					setTimeout(() => { this.loaded = true; }, 1000);
				}
			);
	}

	getNotificaciones(userNotifications: UsuarioNotificaciones[]): void {
		for (let userNotification of userNotifications) {
			this.userService.getNotification(userNotification.id)
				.subscribe(
					(notification: Notificacion) => {
						this.notifications.push(
							{
								idNotification: notification.id,
								idUserNotification: userNotification.id,
								text: notification.text,
								read: userNotification.read
							}
						);
					}
				);
		}
	}

	leerNotificacion(notification) {
		this.userService.leerNotification(this.localStorageService.getUserId(), notification.idUserNotification)
			.subscribe();
	}

}
