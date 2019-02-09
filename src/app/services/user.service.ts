import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private apiUrl = 'https://infocarte-api.herokuapp.com/';

	constructor(private http: HttpClient) { }

	getUser(): Observable<any> {
		return this.http.get(this.getUrl('users/me'));
	}

	private getUrl(modelo: String): string {
		return this.apiUrl + modelo;
	}

}
