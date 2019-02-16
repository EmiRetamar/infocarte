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
    comentariosUser: any;
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
            .subscribe((cartelera) => {
                this.carteleraService.getPublicacion(idPost)
                    .subscribe((post) => {
                        this.carteleraService.getComentarios(idPost)
                            .subscribe((comentarios) => {
                                this.cartelera = cartelera;
                                this.post = post;
                                this.comentarios = comentarios;
                                // Si el usuario esta logueado
                                if(this.localStorageService.getToken()) {
                                    this.userService.getComentarios(this.localStorageService.getUserId())
                                    .subscribe((comentariosUser) => {
                                        this.comentariosUser = comentariosUser;
                                    });
                                }
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

    getUserForComment(idComentario) {
        this.userService.getUserForComment(idComentario)
            .subscribe(
                (user) => {
                    return user;
                }
            );
    }

    isMyComment(comentarioActual: any) {
        for (let comentario of this.comentariosUser) {
            if (this.equals(comentario, comentarioActual))
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
                    (comentario) => {
                        this.addComentario(comentario);
                        this.toasterService.success('Enviado !');
                    }
                );
        }
        else {
            return;
        }
    }

    addComentario(comentario: any) {
        this.comentarios.push(comentario);
        this.comentariosUser.push(comentario);
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

    equals(x, y) {
        if ( x === y ) return true;
        // if both x and y are null or undefined and exactly the same

        if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
            // if they are not strictly equal, they both need to be Objects

        if ( x.constructor !== y.constructor ) return false;
            // they must have the exact same prototype chain, the closest we can do is
            // test there constructor.

        for ( var p in x ) {
            if ( ! x.hasOwnProperty( p ) ) continue;
            // other properties were tested using x.constructor === y.constructor

            if ( ! y.hasOwnProperty( p ) ) return false;
            // allows to compare x[ p ] and y[ p ] when set to undefined

            if ( x[ p ] === y[ p ] ) continue;
            // if they have the same strict value or identity then they are equal

            if ( typeof( x[ p ] ) !== "object" ) return false;
            // Numbers, Strings, Functions, Booleans must be strictly equal

            if ( ! this.equals( x[ p ],  y[ p ] ) ) return false;
            // Objects and Arrays must be tested recursively
        }

        for ( p in y ) {
            if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
            // allows x[ p ] to be set to undefined
        }
        return true;
    }

}
