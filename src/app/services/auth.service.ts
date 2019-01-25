import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import { Usuario } from '../models/Usuario';

@Injectable()
export class AuthService {

    private apiUrl = 'https://infocarte-api.herokuapp.com/api/auth/signin';

    // El atributo http es inyectado por el framework (Inyeccion de dependencias)
    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {

        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        });

        const httpOptions = {
            headers: headers
        };

        return this.http.post(this.apiUrl, params.toString(), httpOptions)
            .pipe(map(result => this.setSession(result)));
    }

    setSession(jwt) {
        const expiresAt = moment().add(jwt.expires_in, 'second');

        console.log(jwt.access_token);
        localStorage.setItem('id_token', jwt.access_token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );

        return jwt;
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

}
