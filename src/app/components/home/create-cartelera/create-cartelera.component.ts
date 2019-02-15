import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteleraService } from '../../../services/cartelera.service';
import { UserService } from '../../../services/user.service';
import { ToasterService } from '../../../services/toaster.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'info-create-cartelera',
    templateUrl: './create-cartelera.component.html',
    styleUrls: ['./create-cartelera.component.scss']
})
export class CreateCarteleraComponent implements OnInit {

    createCarteleraForm: FormGroup;
    submitted = false;

    constructor(private carteleraService: CarteleraService,
                private userService: UserService,
                private toasterService: ToasterService,
                private formBuilder: FormBuilder,
                private router: Router,
                public localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.createCarteleraForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
            image: ['']
        });
    }

    get form() {
        return this.createCarteleraForm.controls;
    }

    createCartelera() {
        this.submitted = true;
        if (this.createCarteleraForm.valid) {
            let formData = this.createCarteleraForm.value;
            formData.created_by = `users/${this.localStorageService.getUserId()}`;
            // ESTO ES TEMPORAL HASTA QUE ESTE IMPLEMENTADO EL CARGADOR DE IMAGENES
            formData.image = 'https://cdn-images-1.medium.com/max/1600/1*qwoA9FmZDrE5q--_9qqBCQ.jpeg';
            this.carteleraService.postCartelera(formData)
                .subscribe(
                    (result) => {
                        // Codigo de resultado exitoso
                        this.router.navigateByUrl('/home');
                        this.toasterService.success('Cartelera creada con éxito !');
                        console.log(result);
                    },
                    (error) => {
                        // Mensaje de error
                    }
                );
        }
        else {
            return;
        }
    }

}
