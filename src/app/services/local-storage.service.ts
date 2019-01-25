import { Injectable } from '@angular/core';

@Injectable({
    // Nueva notacion para inyectar un servicio disponible a partir de Angular 6
    // No es necesario declarar el servicio en la seccion providers de un modulo
    // El modulo 'root' es app.module.ts
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public getToken(id_token: string): string {
        return localStorage.getItem(id_token);
    }

    public getExpiresAt(expires_at: string): string {
        return localStorage.getItem(expires_at);
    }

}
