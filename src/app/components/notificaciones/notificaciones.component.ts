import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Notificacion } from '../../models/notificacion';

@Component({
	selector: 'info-notificaciones',
	templateUrl: './notificaciones.component.html',
	styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

	notifications = new Array();

	constructor(private userService: UserService,
				private localStorageService: LocalStorageService) { }

	ngOnInit() {
		this.userService.getUserNotifications(this.localStorageService.getUserId())
			.subscribe(
				(userNotifications) => {
					this.getNotificaciones(userNotifications);
				}
			);
	}

	getNotificaciones(userNotifications): void {
		for (let userNotification of userNotifications) {
			this.userService.getNotification(userNotification.id)
				.subscribe(
					(notification: Notificacion) => {
						this.notifications.push([ notification.text, userNotification.read ]);
					}
				);
		}
	}

}
