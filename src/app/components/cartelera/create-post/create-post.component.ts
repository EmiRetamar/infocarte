import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteleraService } from '../../../services/cartelera.service';
import { UserService } from '../../../services/user.service';
import { ToasterService } from '../../../services/toaster.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
    selector: 'info-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

    idCartelera: string;
    createPostForm: FormGroup;
    comentariosHabilitados = false;
    submitted = false;

    constructor(private carteleraService: CarteleraService,
                private userService: UserService,
                private toasterService: ToasterService,
                private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                public localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.idCartelera = this.route.snapshot.paramMap.get('idCartelera');
        this.createPostForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
            image: [''],
            comments_enabled: ['']
        });
    }

    get form() {
        return this.createPostForm.controls;
    }

    createPost() {
        this.submitted = true;
        if (this.createPostForm.valid) {
            let formData = this.createPostForm.value;
            formData.user = `users/${this.localStorageService.getUserId()}`;
            formData.billboard = `billboards/${this.idCartelera}`;
            // ESTO ES TEMPORAL HASTA QUE ESTE IMPLEMENTADO EL CARGADOR DE IMAGENES
            formData.image = 'https://novemberfive.co/images/blog/kotlin-implementation/img-header.jpg'
            this.carteleraService.postPublicacion(formData)
                .subscribe(
                    (result) => {
                        // Codigo de resultado exitoso
                        this.router.navigateByUrl(`/cartelera/${this.idCartelera}`);
                        this.toasterService.success('Publicación creada con éxito !');
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
