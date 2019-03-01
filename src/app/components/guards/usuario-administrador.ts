import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToasterService } from '../../services/toaster.service';

@Injectable()
export class UsuarioAdministrador implements CanActivate {

    constructor(private localStorageService: LocalStorageService,
                private toasterService: ToasterService,
                private router: Router) { }

    canActivate() {
        let roleUser = JSON.parse(this.localStorageService.getAuthorities())[0].authority;
        if (roleUser != 'ADMIN') {
            this.toasterService.warning('No tienes permisos para acceder');
            this.router.navigate(['/home']);
            return false;
        }

        return true;
    }

}
