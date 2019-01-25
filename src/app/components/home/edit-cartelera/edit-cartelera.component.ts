import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteleraService } from '../../../services/cartelera.service';

@Component({
    selector: 'info-edit-cartelera',
    templateUrl: './edit-cartelera.component.html',
    styleUrls: ['./edit-cartelera.component.scss']
})
export class EditCarteleraComponent implements OnInit {

    editCarteleraForm: FormGroup;
    submitted = false;

    constructor(private carteleraService: CarteleraService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.editCarteleraForm = this.formBuilder.group({
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            subtitulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
            imagen: ['']
        });
    }

    get form() {
        return this.editCarteleraForm.controls;
    }

    editCartelera() {
        this.submitted = true;
        if (this.editCarteleraForm.valid) {
            let formData = this.editCarteleraForm.value;
            console.log(formData);
            // Aca es un update
            this.carteleraService.updateCartelera(formData)
                .subscribe(
                    result => {
                        // Codigo de resultado exitoso
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
