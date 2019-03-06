import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
    selector: 'info-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    loginError: boolean = false;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private toasterService: ToasterService) { }

    ngOnInit() {
        document.body.className = 'image';
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnDestroy() {
        document.body.className = '';
    }

    login() {
        let formData = this.loginForm.value;

        if (formData.username && formData.password) {
            this.authService.login(formData.username, formData.password)
                .subscribe(
                    result => {
                        console.log(result);
                        this.router.navigateByUrl('/');
                    },
                    error => {
                        // Si el codigo de error es 401 significa que las credenciales son incorrectas
                        if (error.status == 401) {
                            this.loginError = true;
                        }
                        // Sino es que se produjo un error de otro tipo
                        else {
                            this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                        }
                        console.error(error.message);
                    }
                );
        }
    }

}
