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
        })
        return this.http.patch(this.getUrl(`billboards/${cartelera.id}`), cartelera, { headers: httpHeaders });
    }

    deleteCartelera(idCartelera: string) {
        return this.http.delete(this.getUrl(`billboards/${idCartelera}`));
    }

    like(cartelera: any) {
        return this.http.get(this.getUrl('billboards'));
    }

    dislike(cartelera: any) {
        return this.http.get(this.getUrl('billboards'));
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

    private getUrl(modelo: String): string {
        return this.apiUrl + modelo;
    }
/*
    addCartelera(model: Cartelera): Observable<Producto> {
        return this.http.post(this.getUrl('cartelera'), model, this.getOptions()).map(this.getDatos).catch(this.error);
    }

    updateCartelera(model: Cartelera) {
        return this.http.put(this.getUrl('cartelera'), model, this.getOptions()).catch(this.error);
    }

    removeCartelera(model: Cartelera) {
        return this.http.delete(this.getUrl('cartelera') + '/' + model.id, this.getOptions()).catch(this.error);
    }*/

}
