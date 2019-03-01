import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { CarteleraService } from '../../../services/cartelera.service';
import { UserService } from '../../../services/user.service';
import { ToasterService } from '../../../services/toaster.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Post } from '../../../models/post';

@Component({
    selector: 'info-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

    idCartelera: string;
    createPostForm: FormGroup;
    imageUrl: string;
    comentariosHabilitados = false;
    submitted = false;
    loading = false;
    loaded = false;
    uploadProgress: Observable<number>;
    uploadUrl: Observable<string>;

    constructor(private carteleraService: CarteleraService,
                private userService: UserService,
                private toasterService: ToasterService,
                private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private fireStorage: AngularFireStorage,
                public localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.idCartelera = this.route.snapshot.paramMap.get('idCartelera');
        this.createPostForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
            image: [''],
            comments_enabled: [false]
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
            if (this.imageUrl == undefined)
                formData.image = '../../../../assets/publicacion.jpg';
            else
                formData.image = this.imageUrl;
            this.carteleraService.postPublicacion(formData)
                .subscribe(
                    (newPost: Post) => {
                        this.router.navigateByUrl(`/cartelera/${this.idCartelera}`);
                        this.toasterService.success('Publicación creada con éxito !');
                        console.log(newPost);
                    },
                    (error) => {
                        this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                        console.error(error.message);
                    }
                );
        }
        else {
            return;
        }
    }

    upload(event) {
        // Cargando imagen
        this.loading = true;

        // Se obtiene el archivo del input
        const file = event.target.files[0];

        // Se genera un id aleatorio que se usara como nombre de la imagen
        const randomId = Math.random().toString(36).substring(2);

        const filepath = `images/${randomId}`;

        const fileRef = this.fireStorage.ref(filepath);

        // Se sube la imagen
        const task = this.fireStorage.upload(filepath, file);

        // Se setea el progreso de carga
        this.uploadProgress = task.percentageChanges();

        // Se notifica cuando la imagen termina de subirse y esta disponible
        task.snapshotChanges().pipe(
            finalize(() => {
                this.uploadUrl = fileRef.getDownloadURL();
                this.uploadUrl.subscribe((imageUrl) => this.imageUrl = imageUrl);
                this.loading = false;
                this.loaded = true;
            })
        ).subscribe();
    }

}
