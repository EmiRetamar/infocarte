import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem('id_token');
        // Se verifica si el token existe
        if (idToken) {
            // Se clonan los encabezados http y se agrega un encabezado extra de autorizacion que contendra el JWT
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + idToken)
            });
            // El JWT ahora se está enviando al servidor en cada requerimiento http
            return next.handle(cloned);
        } else {
            // El requerimiento pasa al servidor sin modificaciones
            return next.handle(req);
        }
    }

}
