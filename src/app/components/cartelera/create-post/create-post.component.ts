import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteleraService } from '../../../services/cartelera.service';

@Component({
    selector: 'info-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

    idCartelera: string;
    createPostForm: FormGroup;
    submitted = false;

    constructor(private carteleraService: CarteleraService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.idCartelera = this.route.snapshot.paramMap.get('id');
        this.createPostForm = this.formBuilder.group({
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            subtitulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
            imagen: ['']
        });
    }

    get form() {
        return this.createPostForm.controls;
    }

    createPost() {
        this.submitted = true;
        if (this.createPostForm.valid) {
            let formData = this.createPostForm.value;
            console.log(formData);
            this.carteleraService.postPublicacion(formData)
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
