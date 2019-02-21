import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Cartelera } from '../models/cartelera';

@Injectable()
export class CarteleraService {

    private apiUrl = 'https://infocarte-api.herokuapp.com/';

    constructor(private http: HttpClient) { }

    getCarteleras(): Observable<any> {
        return this.http.get(this.getUrl('billboards'))
            .pipe(map((result: any) => result._embedded.billboards));
    }

    getCartelera(idCartelera: string): Observable<any> {
        return this.http.get(this.getUrl(`billboards/${idCartelera}`));
    }

    getPosts(idCartelera: string): Observable<any> {
        return this.http.get(this.getUrl(`billboards/${idCartelera}/posts`))
            .pipe(map((result: any) => result._embedded.posts));
    }

    postCartelera(cartelera: Object) {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        return this.http.post(this.getUrl('billboards'), cartelera, { headers: httpHeaders });
    }

    updateCartelera(cartelera: any) {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        return this.http.patch(this.getUrl(`billboards/${cartelera.id}`), cartelera, { headers: httpHeaders });
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
        /*let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        let body = { "billboard_id": `${idCartelera}` };
        return this.http.delete(this.getUrl(`users/${idUser}/followBillboard`), { headers: httpHeaders });*/
        return this.http.get(this.getUrl('billboards'));
    }

    getSeguidores(idCartelera) {
		return this.http.get(this.getUrl(`billboards/${idCartelera}/usersFollowers`))
			.pipe(map((result: any) => result._embedded.users));
	}

    getPublicacion(idPost: string): Observable<any> {
        return this.http.get(this.getUrl(`posts/${idPost}`));
    }

    postPublicacion(post: Object) {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        return this.http.post(this.getUrl('posts'), post, { headers: httpHeaders });
    }

    updatePublicacion(post: any) {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        return this.http.patch(this.getUrl(`posts/${post.id}`), post, { headers: httpHeaders });
    }

    deletePublicacion(idPost: string) {
        return this.http.delete(this.getUrl(`posts/${idPost}`));
    }

    getComentarios(idPost: string) {
        return this.http.get(this.getUrl(`posts/${idPost}/comments`))
            .pipe(map((comentarios: any) => comentarios._embedded.comments));
    }

    postComentario(comentario: Object) {
        let httpHeaders = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8'
        });
        return this.http.post(this.getUrl('comments'), comentario, { headers: httpHeaders });
    }

    deleteComentario(idComentario: string) {
        return this.http.delete(this.getUrl(`comments/${idComentario}`));
    }

    private getUrl(modelo: String): string {
        return this.apiUrl + modelo;
    }

}
