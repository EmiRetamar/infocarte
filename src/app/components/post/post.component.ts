import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeletePostComponent } from '../cartelera/delete-post/delete-post.component';
import { DeleteComentarioComponent } from '../post/delete-comentario/delete-comentario.component';
import { CarteleraService } from '../../services/cartelera.service';
import { UserService } from '../../services/user.service';
import { ToasterService } from '../../services/toaster.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cartelera } from '../../models/cartelera';
import { Post } from '../../models/post';
import { Comentario } from '../../models/comentario';
import { Notificacion } from '../../models/notificacion';
import { Usuario } from '../../models/usuario';

@Component({
    selector: 'info-cartelera-detail',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    idCartelera: string;
    idPost: string;
    user: Usuario;
    cartelera: Cartelera;
    post: Post;
    comentarios: Comentario[];
    comentariosUser: any;
    usersForComments: Usuario[] = new Array();
    seguidores: Usuario[];
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
        this.idCartelera = this.route.snapshot.paramMap.get('idCartelera');
        this.idPost = this.route.snapshot.paramMap.get('idPost');
        this.carteleraService.getCartelera(this.idCartelera)
            .subscribe((cartelera) => {
                this.carteleraService.getPublicacion(this.idPost)
                    .subscribe((post) => {
                        this.carteleraService.getComentarios(this.idPost)
                            .subscribe((comentarios) => {
                                if (this.localStorageService.getToken()) {
                                    this.userService.getUserById(this.localStorageService.getUserId())
                                        .subscribe((user) => {
                                            this.userService.getComentariosUser(this.localStorageService.getUserId())
                                                .subscribe((comentariosUser) => {
                                                    this.cartelera = cartelera;
                                                    this.post = post;
                                                    this.comentarios = comentarios;
                                                    this.user = user;
                                                    this.comentariosUser = comentariosUser;
                                                    this.getUsersForComments(this.comentarios);
                                                    this.loaded = true;
                                                });
                                        });
                                }
                                else {
                                    this.cartelera = cartelera;
                                    this.post = post;
                                    this.comentarios = comentarios;
                                    this.loaded = true;
                                }
                            });
                    },
                    (error) => {
                        if (error.status == 404) {
                            console.log(error.message);
                            this.router.navigateByUrl('/page-not-found');
                        }
                    });
            },
            (error) => {
                if (error.status == 404) {
                    console.log(error.message);
                    this.router.navigateByUrl('/page-not-found');
                }
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

    /*
    Los comentarios del usuario logueado vienen en este formato:
    {
        "success": true,
        "count": 4,
        "data": [
            [
                1,
                "Genial! Al fin publican los horarios."
            ],
            [
                11,
                "Aprobeeee."
            ],
            [
                21,
                "Uh tengo que recursar"
            ],
            [
                31,
                "APROBAMOS TTPS!!"
            ]
        ]
    }

    Se filtra solo el atributo "data" cuando se recibe la respuesta en el metodo getComentarios(idUser)
    de la clase UserService
    */
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
                        this.getSeguidoresForCartelera(this.idCartelera);
                        this.notificarUsuarios();
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

    getSeguidoresForCartelera(idCartelera: string) {
        this.carteleraService.getSeguidores(idCartelera)
            .subscribe(
                (seguidores: Usuario[]) => this.seguidores = seguidores
            )
    }

    notificarUsuarios() {
        this.carteleraService.postNotification(`${this.user.name} ${this.user.lastname} creó un comentario en la publicación "${this.post.title}" de la cartelera "${this.cartelera.title}"`, this.post.id, this.user.id)
            .subscribe(
                (notificacion: Notificacion) => {
                    for (let seguidor of this.seguidores) {
                        this.carteleraService.postUserNotification(notificacion.id, seguidor.id).subscribe();
                    }
                }
            );
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
