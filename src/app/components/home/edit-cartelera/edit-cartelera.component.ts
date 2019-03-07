import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { CarteleraService } from '../../../services/cartelera.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cartelera } from '../../../models/cartelera';

@Component({
    selector: 'info-edit-cartelera',
    templateUrl: './edit-cartelera.component.html',
    styleUrls: ['./edit-cartelera.component.scss']
})
export class EditCarteleraComponent implements OnInit {

    cartelera: any;
    editCarteleraForm: FormGroup;
    imageUrl: string;
    submitted = false;
    loading = false;
    loaded = false;
    uploadProgress: Observable<number>;
    uploadUrl: Observable<string>;

    constructor(private carteleraService: CarteleraService,
                private toasterService: ToasterService,
                private formBuilder: FormBuilder,
                private fireStorage: AngularFireStorage,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        let idCartelera: string;
        idCartelera = this.route.snapshot.paramMap.get('idCartelera');
        this.carteleraService.getCartelera(idCartelera)
            .subscribe(
                (cartelera) => this.cartelera = cartelera,
                (error) => {
                    if (error.status == 404) {
                        console.log(error.message);
                        this.router.navigateByUrl('/page-not-found');
                    }
                }
            );
        this.editCarteleraForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
            image: ['']
        });
    }

    get form() {
        return this.editCarteleraForm.controls;
    }

    editCartelera() {
        this.submitted = true;
        if (this.editCarteleraForm.valid) {
            let formData = this.editCarteleraForm.value;
            formData.id = this.cartelera.id;
            if (this.imageUrl == undefined)
                // Si no se cambio la imagen, se mantiene la misma
                formData.image = this.cartelera.image;
            else
                formData.image = this.imageUrl;
            this.carteleraService.updateCartelera(formData)
                .subscribe(
                    (updatedBillboard: Cartelera) => {
                        this.router.navigateByUrl('/home');
                        this.toasterService.success('Cartelera editada con éxito !');
                        console.log(updatedBillboard);
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

        this.loading = true;

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
                this.loading = false;
                this.loaded = true;
            })
        ).subscribe();
    }

}
