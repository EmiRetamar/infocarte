import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Cartelera } from '../models/cartelera';
import { Post } from '../models/post';
import { Comentario } from '../models/comentario';
import { Notificacion } from '../models/notificacion';
import { Usuario } from '../models/usuario';

@Injectable()
export class CarteleraService {

    private apiUrl = 'https://infocarte-api.herokuapp.com/';

    constructor(private http: HttpClient) { }

    getCarteleras(): Observable<Cartelera[]> {
        return this.http.get(this.getUrl('billboards'))
            .pipe(map((result: any) => result._embedded.billboards as Cartelera[]));
    }

    getCartelera(idCartelera: string): Observable<Cartelera> {
        return this.http.get<Cartelera>(this.getUrl(`billboards/${idCartelera}`));
    }

    getCarteleraForPost(idPost: string): Observable<Cartelera> {
        return this.http.get<Cartelera>(this.getUrl(`posts/${idPost}/billboard`));
    }

    getPosts(idCartelera: string): Observable<Post[]> {
        return this.http.get(this.getUrl(`billboards/${idCartelera}/posts`))
            .pipe(map((result: any) => result._embedded.posts as Post[]));
    }

    postCartelera(cartelera: Object): Observable<Cartelera> {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        return this.http.post<Cartelera>(this.getUrl('billboards'), cartelera, { headers: httpHeaders });
    }

    updateCartelera(cartelera: any): Observable<Cartelera> {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        return this.http.patch<Cartelera>(this.getUrl(`billboards/${cartelera.id}`), cartelera, { headers: httpHeaders });
    }

    deleteCartelera(idCartelera: string) {
        return this.http.delete(this.getUrl(`billboards/${idCartelera}`));
    }

    follow(idUser: string, idCartelera: string) {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        let body = { "billboard_id": `${idCartelera}` };
        return this.http.post(this.getUrl(`users/${idUser}/followBillboard`), body, { headers: httpHeaders });
    }

    unfollow(idUser: string, idCartelera: string) {
        return this.http.get(this.getUrl(`users/${idUser}/unfollowBillboard/${idCartelera}`));
    }

    getSeguidores(idCartelera: string): Observable<Usuario[]> {
		return this.http.get(this.getUrl(`billboards/${idCartelera}/usersFollowers`))
			.pipe(map((result: any) => result._embedded.users as Usuario[]));
	}

    getPublicacion(idPost: string): Observable<Post> {
        return this.http.get<Post>(this.getUrl(`posts/${idPost}`));
    }

    postPublicacion(post: Object): Observable<Post> {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        return this.http.post<Post>(this.getUrl('posts'), post, { headers: httpHeaders });
    }

    updatePublicacion(post: any): Observable<Post> {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        return this.http.patch<Post>(this.getUrl(`posts/${post.id}`), post, { headers: httpHeaders });
    }

    deletePublicacion(idPost: string) {
        return this.http.delete(this.getUrl(`posts/${idPost}`));
    }

    getComentarios(idPost: string): Observable<Comentario[]> {
        return this.http.get(this.getUrl(`posts/${idPost}/comments`))
            .pipe(map((comentarios: any) => comentarios._embedded.comments as Comentario[]));
    }

    postComentario(comentario: Object): Observable<Comentario> {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        return this.http.post<Comentario>(this.getUrl('comments'), comentario, { headers: httpHeaders });
    }

    deleteComentario(idComentario: string) {
        return this.http.delete(this.getUrl(`comments/${idComentario}`));
    }

    postNotificacion(notificacion: string): Observable<Notificacion> {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        let body = { "text": `${notificacion}` };
        return this.http.post<Notificacion>(this.getUrl('notifications'), body, { headers: httpHeaders });
    }

    postUserNotificacion(idNotificacion: string, idUser: string) {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        let body = {
            "notification": `notifications/${idNotificacion}`,
            "user": `users/${idUser}`
        };
        return this.http.post(this.getUrl('userNotifications'), body, { headers: httpHeaders });
    }

    private getUrl(modelo: String): string {
        return this.apiUrl + modelo;
    }

}
