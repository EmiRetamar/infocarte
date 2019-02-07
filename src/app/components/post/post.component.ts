import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteleraService } from '../../services/cartelera.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'info-cartelera-detail',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    cartelera: any;
    post: any;
    comentarios: any;
    commentForm: FormGroup;

    constructor(private carteleraService: CarteleraService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                public localStorageService: LocalStorageService) { }

    ngOnInit() {
        let idCartelera: string;
        let idPost: string;
        idCartelera = this.route.snapshot.paramMap.get('idCartelera');
        idPost = this.route.snapshot.paramMap.get('idPost');
        this.carteleraService.getCartelera(idCartelera)
            .subscribe(
                (cartelera) => {
                    this.carteleraService.getPublicacion(idPost)
                        .subscribe(
                            (post) => {
                                this.carteleraService.getComentarios(idPost)
                                    .subscribe(
                                        (comentarios) => {
                                            this.cartelera = cartelera;
                                            this.post = post;
                                            this.comentarios = comentarios;
                                        }
                                    );
                            }
                        );
                }
            );
        this.commentForm = this.formBuilder.group({
            comentario: ['', [Validators.minLength(1), Validators.maxLength(1000)]]
        });
    }

}
