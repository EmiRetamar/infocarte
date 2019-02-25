import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
// import { Usuario } from '../models/Usuario';

@Injectable()
export class AuthService {

    private apiUrl = 'https://infocarte-api.herokuapp.com/api/auth/signin';

    // El atributo http es inyectado por el framework (Inyeccion de dependencias)
    constructor(private http: HttpClient, private userService: UserService) { }

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
            .pipe(map((result: any) => this.setSession(result)));
    }

    setSession(jwt) {

        console.log(jwt.accessToken);
        localStorage.setItem('id_token', jwt.accessToken);
        localStorage.setItem('token_type', jwt.tokenType);

        const expiresAt = moment().add(jwt.expires_in, 'second');
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );

        this.userService.getUser()
            .subscribe(
                (user) => {
                    localStorage.setItem('id', user.id);
                    localStorage.setItem('username', user.username);
                    /* localStorage solo puede guardar strings, por lo tanto la unica forma de guardar
                    un objeto es convertirlo en string (queda en formato json pero como un string)
                    y luego antes de recuperarlo convertirlo en objeto */
                    localStorage.setItem('authorities', JSON.stringify(user.authorities));
                }
            );

        return jwt;
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
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
