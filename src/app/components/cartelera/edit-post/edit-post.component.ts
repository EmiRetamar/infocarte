import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteleraService } from '../../../services/cartelera.service';

@Component({
    selector: 'info-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

    idCartelera: string;
    titlePost: string;
    editPostForm: FormGroup;
    submitted = false;

    constructor(private carteleraService: CarteleraService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.idCartelera = this.route.snapshot.paramMap.get('id');
        this.titlePost = this.route.snapshot.paramMap.get('title');
        this.editPostForm = this.formBuilder.group({
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            subtitulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
            imagen: ['']
        });
    }

    get form() {
        return this.editPostForm.controls;
    }

    editPost() {
        this.submitted = true;
        if (this.editPostForm.valid) {
            let formData = this.editPostForm.value;
            console.log(formData);
            // Aca es un update
            this.carteleraService.updatePublicacion(formData)
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
