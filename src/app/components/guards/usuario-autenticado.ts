import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToasterService } from '../../services/toaster.service';

@Injectable()
export class UsuarioAutenticado implements CanActivate {

    constructor(private localStorageService: LocalStorageService,
                private toasterService: ToasterService,
                private router: Router) { }

    canActivate() {
        if (!this.localStorageService.getToken()) {
            this.toasterService.warning('Debes iniciar sesión');
            this.router.navigate(['/home']);
            return false;
        }

        return true;
    }

}
