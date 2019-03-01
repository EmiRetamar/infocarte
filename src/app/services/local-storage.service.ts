import { Injectable } from '@angular/core';

@Injectable({
    // Nueva notacion para inyectar un servicio disponible a partir de Angular 6
    // No es necesario declarar el servicio en la seccion providers de un modulo
    // El modulo 'root' es app.module.ts
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public getToken(): string {
        return localStorage.getItem('id_token');
    }

    public getExpiresAt(): string {
        return localStorage.getItem('expires_at');
    }

    public getTokenType(): string {
        return localStorage.getItem('token_type');
    }

    public getUserId(): string {
        return localStorage.getItem('id');
    }

    public getUsername(): string {
        return localStorage.getItem('username');
    }

    public getAuthorities(): string {
        return localStorage.getItem('authorities');
    }

}
