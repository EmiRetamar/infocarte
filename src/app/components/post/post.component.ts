import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteleraService } from '../../services/cartelera.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'info-cartelera-detail',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    post: any;
    commentForm: FormGroup;

    constructor(private carteleraService: CarteleraService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder) { }

    ngOnInit() {
        let idCartelera: string;
        let titlePost: string;
        idCartelera = this.route.snapshot.paramMap.get('id');
        titlePost = this.route.snapshot.paramMap.get('title');
        this.carteleraService.getPublicacion(idCartelera, titlePost)
            .subscribe(
                (post) => {
                    this.post = post;
                }
            );
        this.commentForm = this.formBuilder.group({
            comentario: ['', [Validators.minLength(1), Validators.maxLength(1000)]]
        });
    }

}
