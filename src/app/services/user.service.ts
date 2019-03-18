import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Cartelera } from '../models/cartelera';
import { Post } from '../models/post';
import { Usuario } from '../models/usuario';
import { Rol } from '../models/rol';
import { Notificacion } from '../models/notificacion';
import { UsuarioNotificaciones } from '../models/usuario-notificaciones';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private apiUrl = 'https://infocarte-api.herokuapp.com/';

	constructor(private http: HttpClient) { }

	getUser(): Observable<any> {
		return this.http.get(this.getUrl('users/me'));
	}

	getUsers(): Observable<Usuario[]> {
		return this.http.get(this.getUrl('users'))
			.pipe(map((result: any) => result._embedded.users as Usuario[]));
	}

	getUserById(idUser: string): Observable<Usuario> {
		return this.http.get<Usuario>(this.getUrl(`users/${idUser}`));
	}

	updateUser(user: any): Observable<Usuario> {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        return this.http.patch<Usuario>(this.getUrl(`users/${user.id}`), user, { headers: httpHeaders });
    }

	getPostsUser(idUser: string): Observable<Post[]> {
		return this.http.get(this.getUrl(`users/${idUser}/posts`))
			.pipe(map((result: any) => result._embedded.posts as Post[]));
	}

	getUserForComment(idComentario: string): Observable<Usuario> {
		return this.http.get<Usuario>(this.getUrl(`comments/${idComentario}/user`));
	}

	getComentariosUser(idUser: string): Observable<any> {
		return this.http.get(this.getUrl(`users/${idUser}/comments`))
			.pipe(map((comentarios: any) => comentarios.data));
	}

	getCartelerasCreadas(idUser: string): Observable<Cartelera[]> {
		return this.http.get(this.getUrl(`users/${idUser}/createdBillboard`))
			.pipe(map((result: any) => result._embedded.billboards as Cartelera[]));
	}

	getCartelerasSeguidas(idUser: string): Observable<Cartelera[]> {
		return this.http.get(this.getUrl(`users/${idUser}/followedBillboards`))
			.pipe(map((result: any) => result._embedded.billboards as Cartelera[]));
	}

	getPostsCreados(idUser: string): Observable<Post[]> {
		return this.http.get(this.getUrl(`users/${idUser}/posts`))
			.pipe(map((result: any) => result._embedded.posts as Post[]));
	}

	getUserNotifications(idUser: string): Observable<UsuarioNotificaciones[]> {
		return this.http.get(this.getUrl(`users/${idUser}/userNotifications`))
			.pipe(map((result: any) => result._embedded.userNotifications as UsuarioNotificaciones[]));
	}

	getNotification(idUserNotification: string): Observable<Notificacion> {
		return this.http.get<Notificacion>(this.getUrl(`userNotifications/${idUserNotification}/notification`));
	}

	getUserForNotification(idNotification: string): Observable<Usuario> {
		return this.http.get<Usuario>(this.getUrl(`notifications/${idNotification}/user`));
	}

	getPostForNotification(idNotification: string): Observable<Post> {
		return this.http.get<Post>(this.getUrl(`notifications/${idNotification}/post`));
	}

	leerNotification(idUser: string, idUserNotification: string) {
		return this.http.get(this.getUrl(`users/${idUser}/userNotifications/${idUserNotification}`));
	}

	getRoles(idUser: string): Observable<Rol[]> {
		return this.http.get(this.getUrl(`users/${idUser}/roles`))
			.pipe(map((result: any) => result._embedded.roles as Rol[]));
	}

	givePermissions(idUser: string, idCartelera: string) {
		let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        let body = {
			"user": `users/${idUser}`,
			"billboard": `billboards/${idCartelera}`
		};
		return this.http.post(this.getUrl('permissions'), body, { headers: httpHeaders });
	}

	removePermissions(idUser: string, idCartelera: string) {
		return this.http.delete(this.getUrl(`permission/billboard/${idCartelera}/user/${idUser}`));
	}

	getPermissions(idUser: string): Observable<any> {
		return this.http.get<any>(this.getUrl(`users/${idUser}/permissions`))
			.pipe(map((result: any) => result._embedded.permissions));
	}

	getBillboardForPermission(idPermission: string): Observable<Cartelera> {
		return this.http.get<Cartelera>(this.getUrl(`permissions/${idPermission}/billboard`));
	}

	private getUrl(modelo: String): string {
		return this.apiUrl + modelo;
	}

	public hasAuthority(authorityParam: string, jsonAuthorities: string): boolean {
        let authorities = JSON.parse(jsonAuthorities);
        for(let element of authorities) {
            if (element.authority == authorityParam)
				return true;
		}
        return false;
    }

}
