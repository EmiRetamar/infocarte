import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3/pipe';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private apiUrl = 'https://infocarte-api.herokuapp.com/';

	constructor(private http: HttpClient) { }

	getUser(): Observable<any> {
		return this.http.get(this.getUrl('users/me'));
	}

	getUserById(idUser: string) {
		return this.http.get(this.getUrl(`users/${idUser}`));
	}

	getPostsUser(idUser: string) {
		return this.http.get(this.getUrl(`users/${idUser}/posts`))
			.pipe(map((result: any) => result._embedded.posts));
	}

	getUserForComment(idComentario: string) {
		return this.http.get(this.getUrl(`comments/${idComentario}/user`));
	}

	getComentariosUser(idUser: string) {
		return this.http.get(this.getUrl(`users/${idUser}/comments`))
			.pipe(map((comentarios: any) => comentarios.data));
	}

	getCartelerasSeguidas(idUser: string) {
		return this.http.get(this.getUrl(`users/${idUser}/followedBillboards`))
			.pipe(map((result: any) => result._embedded.billboards));
	}

	private getUrl(modelo: String): string {
		return this.apiUrl + modelo;
	}

	public hasAuthority(authorityParam: string, jsonAuthorities: string) {
        let authorities = JSON.parse(jsonAuthorities);
        for(let element of authorities) {
            if (element.authority == authorityParam)
				return true;
		}
        return false;
    }

}
