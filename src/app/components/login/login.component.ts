import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
// import { Usuario } from '../models/Usuario';

@Component({
    selector: 'info-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit, OnDestroy {

    form: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        document.body.className = 'image';
    }

    ngOnDestroy() {
        document.body.className = '';
    }

    login() {
        let formData = this.form.value;

        if (formData.username && formData.password) {
            this.authService.login(formData.username, formData.password)
                .subscribe(
                    res => {
                        console.log(res);
                        this.router.navigateByUrl('/');
                    }
                );
        }
    }

}

/*  model: Usuario = new Usuario();
    error = '';
    loading: boolean = false;

    constructor(private router: Router, private auth: AuthService) { }

    ngOnInit() {
        this.auth.logout();
    }

    login() {
        this.loading = true;
        this.auth.login(this.model)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                }
                else {
                    this.error = 'Datos incorrectos';
                    this.loading = false;
                }
            }, e => {
                this.error = 'Datos incorrectos';
                this.loading = false;
            });
    }*/

    /*form: FormGroup;
    private formSubmitAttempt: boolean;

    constructor(
        private fb: FormBuilder,
        // private authService: AuthService
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    isFieldInvalid(field: string) {
        return (
            (!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt)
        );
    }

    onSubmit() {
        if (this.form.valid) {
            // this.authService.login(this.form.value);
        }
        this.formSubmitAttempt = true;
    }*/
