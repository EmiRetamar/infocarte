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
    submitted = false;

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
            comment: ['', [Validators.minLength(1), Validators.maxLength(1000)]]
        });
    }

    get form() {
        return this.commentForm.controls;
    }

    eliminarPost(post: any) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        // Estos datos son pasados al componente "DeletePostComponent"
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
                                (res) => {
                                    this.router.navigateByUrl(`cartelera/${this.cartelera.id}`);
                                    this.toasterService.success('Publicación eliminada con éxito !');
                                },
                                (error) => {
                                    this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                                }
                            );
                    }
                }
            );
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
            //this.clearButton.nativeElement.onclick();
            this.commentForm.reset();
            this.clearButton.nativeElement.focus();
            this.userService.getUser()
                .subscribe(
                    (user) => {
                        formData.user = `users/${user.id}`;
                        formData.post = `posts/${this.post.id}`;
                        this.carteleraService.postComentario(formData)
                            .subscribe(
                                (comentario) => {
                                    this.addComentario(comentario);
                                    this.toasterService.success('Enviado !');
                                }
                            );
                    }
                );
        }
        else {
            return;
        }
    }

    addComentario(comentario: any) {
        this.comentarios.push(comentario);
    }

    eliminarComentario(comentario: any) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        // Estos datos son pasados al componente "DeleteComentarioComponent"
        dialogConfig.data = {
            id: comentario.id,
            title: comentario.title
        };

        const dialogRef = this.dialog.open(DeleteComentarioComponent, dialogConfig);

        dialogRef.afterClosed()
            .subscribe(
                (result) => {
                    if (result) {
                        this.carteleraService.deleteComentario(comentario.id)
                            .subscribe(
                                (res) => {
                                    this.removeComentario(comentario);
                                    this.toasterService.success('Comentario eliminado con éxito !');
                                },
                                (error) => {
                                    this.toasterService.error('Ha ocurrido un error', 'La acción no ha podido realizarse');
                                }
                            );
                    }
                }
            );
    }

    removeComentario(comentario: any) {
        let index = this.comentarios.indexOf(comentario);
        if (index > -1) {
            this.comentarios.splice(index, 1);
        }
    }

}
