import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeletePostComponent } from '../cartelera/delete-post/delete-post.component';
import { DeleteComentarioComponent } from '../post/delete-comentario/delete-comentario.component';
import { CarteleraService } from '../../services/cartelera.service';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { Cartelera } from '../../models/cartelera';
import { Post } from '../../models/post';
import { Comentario } from '../../models/comentario';
import { Usuario } from '../../models/usuario';

@Component({
    selector: 'info-cartelera-detail',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    user: Usuario;
    cartelera: Cartelera;
    post: Post;
    comentarios: Comentario[];
    comentariosUser: any;
    usersForComments: Usuario[] = new Array();
    commentForm: FormGroup;
    submitted = false;
    loaded = false;

    @ViewChild("clearButton", {read: ElementRef}) clearButton: ElementRef;

    constructor(private carteleraService: CarteleraService,
                private userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private dialog: MatDialog,
                private formBuilder: FormBuilder,
                private toasterService: ToasterService,
                public localStorageService: LocalStorageService) { }

    ngOnInit() {
        let idCartelera: string;
        let idPost: string;
        idCartelera = this.route.snapshot.paramMap.get('idCartelera');
        idPost = this.route.snapshot.paramMap.get('idPost');
        this.carteleraService.getCartelera(idCartelera)
            .subscribe((cartelera) => {
                this.carteleraService.getPublicacion(idPost)
                    .subscribe((post) => {
                        this.carteleraService.getComentarios(idPost)
                            .subscribe((comentarios) => {
                                this.userService.getComentariosUser(this.localStorageService.getUserId())
                                    .subscribe((comentariosUser) => {
                                        this.cartelera = cartelera;
                                        this.post = post;
                                        this.comentarios = comentarios;
                                        this.comentariosUser = comentariosUser;
                                        this.getUsersForComments(this.comentarios);
                                        this.loaded = true;
                                    });
                            });
                    });
            });
        this.commentForm = this.formBuilder.group({
            comment: ['', [Validators.minLength(1), Validators.maxLength(1000)]]
        });
    }

    get form() {
        return this.commentForm.controls;
    }

    eliminarPost(post: Post) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: post.id,
            title: post.title
        };

        const dialogRef = this.dialog.open(DeletePostComponent, dialogConfig);

        dialogRef.afterClosed()
            .subscribe(
                (result) => {
                    if (result) {
                        this.carteleraService.deletePublicacion(post.id)
                            .subscribe(
                                () => {
                                    this.router.navigateByUrl(`cartelera/${this.cartelera.id}`);
                                    this.toasterService.success('Publicación eliminada con éxito !');
                                },
                                (error) => {
                                    this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                                    console.error(error.message);
                                }
                            );
                    }
                }
            );
    }

    getUsersForComments(comentarios: Comentario[]): void {
        for (let comentario of comentarios) {
            this.requestUserForComment(comentario);
        }
    }

    requestUserForComment(comentario: Comentario) {
        this.userService.getUserForComment(comentario.id)
            .subscribe(
                (user: Usuario) => this.usersForComments[comentario.id] = user
            );
    }

    isMyComment(comentarioActual: Comentario) {
        for (let comentario of this.comentariosUser) {
            if (comentario[0] == comentarioActual.id)
                return true;
        }
        return false;
    }

    onKeypress(event) {
        if (event.keyCode == 13) {
            this.comentar();
        }
    }

    comentar() {
        this.submitted = true;
        if (this.commentForm.valid) {
            this.toasterService.info('Enviando...');
            let formData = this.commentForm.value;
            this.commentForm.reset();
            this.clearButton.nativeElement.focus();
            formData.user = `users/${this.localStorageService.getUserId()}`;
            formData.post = `posts/${this.post.id}`;
            this.carteleraService.postComentario(formData)
                .subscribe(
                    (comentario: Comentario) => {
                        this.requestUserForComment(comentario);
                        this.addComentario(comentario);
                        this.toasterService.success('Enviado !');
                        console.log(comentario);
                    },
                    error => {
                        this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                        console.error(error.message);
                    }
                );
        }
        else {
            return;
        }
    }

    addComentario(comentario: Comentario) {
        this.comentarios.push(comentario);
        this.comentariosUser.push([ comentario.id, comentario.comment ]);
    }

    eliminarComentario(comentario: Comentario) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: comentario.id,
            title: comentario.comment
        };

        const dialogRef = this.dialog.open(DeleteComentarioComponent, dialogConfig);

        dialogRef.afterClosed()
            .subscribe(
                (result) => {
                    if (result) {
                        this.carteleraService.deleteComentario(comentario.id)
                            .subscribe(
                                () => {
                                    this.removeComentario(comentario);
                                    this.toasterService.success('Comentario eliminado con éxito !');
                                },
                                (error) => {
                                    this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                                    console.error(error.message);
                                }
                            );
                    }
                }
            );
    }

    removeComentario(comentario: Comentario) {
        let index = this.comentarios.indexOf(comentario);
        if (index > -1) {
            this.comentarios.splice(index, 1);
        }
    }

}
