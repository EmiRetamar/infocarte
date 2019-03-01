import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { CarteleraService } from '../../../services/cartelera.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Post } from '../../../models/post';

@Component({
    selector: 'info-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

    idCartelera: string;
    idPost: string;
    post: Post;
    editPostForm: FormGroup;
    imageUrl: string;
    submitted = false;
    uploadProgress: Observable<number>;
    uploadUrl: Observable<string>;

    constructor(private carteleraService: CarteleraService,
                private toasterService: ToasterService,
                private formBuilder: FormBuilder,
                private fireStorage: AngularFireStorage,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.idCartelera = this.route.snapshot.paramMap.get('idCartelera');
        this.idPost = this.route.snapshot.paramMap.get('idPost');
        this.carteleraService.getPublicacion(this.idPost)
            .subscribe(
                (post: Post) => this.post = post
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
            if (this.imageUrl == undefined)
                formData.image = this.post.image;
            else
                formData.image = this.imageUrl;
            this.carteleraService.updatePublicacion(formData)
                .subscribe(
                    (updatedPost: Post) => {
                        this.router.navigateByUrl(`/cartelera/${this.idCartelera}`);
                        this.toasterService.success('Publicación editada con éxito !');
                        console.log(updatedPost);
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

        const file = event.target.files[0];

        const randomId = Math.random().toString(36).substring(2);

        const filepath = `images/${randomId}`;

        const fileRef = this.fireStorage.ref(filepath);

        const task = this.fireStorage.upload(filepath, file);

        this.uploadProgress = task.percentageChanges();

        task.snapshotChanges().pipe(
            finalize(() => {
                this.uploadUrl = fileRef.getDownloadURL();
                this.uploadUrl.subscribe((imageUrl) => this.imageUrl = imageUrl);
            })
        ).subscribe();
    }

}
