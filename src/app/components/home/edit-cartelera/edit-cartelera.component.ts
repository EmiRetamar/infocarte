import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteleraService } from '../../../services/cartelera.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'info-edit-cartelera',
    templateUrl: './edit-cartelera.component.html',
    styleUrls: ['./edit-cartelera.component.scss']
})
export class EditCarteleraComponent implements OnInit {

    cartelera: any;
    editCarteleraForm: FormGroup;
    submitted = false;

    constructor(private carteleraService: CarteleraService,
                private toasterService: ToasterService,
                private formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        let idCartelera: string;
        idCartelera = this.route.snapshot.paramMap.get('idCartelera');
        this.carteleraService.getCartelera(idCartelera)
            .subscribe(
                (cartelera) => this.cartelera = cartelera
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
            // ESTO ES TEMPORAL HASTA QUE ESTE IMPLEMENTADO EL CARGADOR DE IMAGENES
            formData.image = 'https://cdn-images-1.medium.com/max/1600/1*qwoA9FmZDrE5q--_9qqBCQ.jpeg';
            this.carteleraService.updateCartelera(formData)
                .subscribe(
                    (result) => {
                        // Codigo de resultado exitoso
                        this.router.navigateByUrl('/home');
                        this.toasterService.success('Cartelera editada con éxito !');
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
