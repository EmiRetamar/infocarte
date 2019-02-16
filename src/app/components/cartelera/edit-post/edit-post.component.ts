import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteleraService } from '../../../services/cartelera.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
    selector: 'info-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

    idCartelera: string;
    idPost: string;
    post: any;
    editPostForm: FormGroup;
    submitted = false;

    constructor(private carteleraService: CarteleraService,
                private toasterService: ToasterService,
                private formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.idCartelera = this.route.snapshot.paramMap.get('idCartelera');
        this.idPost = this.route.snapshot.paramMap.get('idPost');
        this.carteleraService.getPublicacion(this.idPost)
            .subscribe(
                (post) => this.post = post
            )
        this.editPostForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
            image: [''],
            comments_enabled: ['']
        });
    }

    get form() {
        return this.editPostForm.controls;
    }

    editPost() {
        this.submitted = true;
        if (this.editPostForm.valid) {
            let formData = this.editPostForm.value;
            formData.id = this.post.id;
            // ESTO ES TEMPORAL HASTA QUE ESTE IMPLEMENTADO EL CARGADOR DE IMAGENES
            formData.image = 'https://udemy-images.udemy.com/course/750x422/947098_02ec.jpg';
            this.carteleraService.updatePublicacion(formData)
                .subscribe(
                    (result) => {
                        // Codigo de resultado exitoso
                        this.router.navigateByUrl(`/cartelera/${this.idCartelera}`);
                        this.toasterService.success('Publicación editada con éxito !');
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
