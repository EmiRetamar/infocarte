import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteleraService } from '../../../services/cartelera.service';

@Component({
    selector: 'info-create-cartelera',
    templateUrl: './create-cartelera.component.html',
    styleUrls: ['./create-cartelera.component.scss']
})
export class CreateCarteleraComponent implements OnInit {

    createCarteleraForm: FormGroup;
    submitted = false;

    constructor(private carteleraService: CarteleraService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.createCarteleraForm = this.formBuilder.group({
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            subtitulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
            imagen: ['']
        });
    }

    get form() {
        return this.createCarteleraForm.controls;
    }

    createCartelera() {
        this.submitted = true;
        if (this.createCarteleraForm.valid) {
            let formData = this.createCarteleraForm.value;
            console.log(formData);
            this.carteleraService.postCartelera(formData)
                .subscribe(
                    result => {
                        // Codigo de resultado exitoso
                        console.log(result);
                    },
                    error => {
                        // Mensaje de error
                    }
                );
        }
        else {
            return;
        }
    }

}
