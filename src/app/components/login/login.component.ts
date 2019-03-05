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
                        this.loginError = true;
                        console.error(error.message);
                    }
                );
        }
    }

}
