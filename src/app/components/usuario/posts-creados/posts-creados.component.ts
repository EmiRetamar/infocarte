import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeletePostComponent } from '../../cartelera/delete-post/delete-post.component';
import { CarteleraService } from '../../../services/cartelera.service';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ToasterService } from '../../../services/toaster.service';
import { Cartelera } from '../../../models/cartelera';
import { Post } from '../../../models/post';

@Component({
	selector: 'info-posts-creados',
	templateUrl: './posts-creados.component.html',
	styleUrls: ['./posts-creados.component.css']
})
export class PostsCreadosComponent implements OnInit {

	posts: Post[];
	cartelerasForPosts: string[] = new Array();
	loaded = false;

	constructor(private carteleraService: CarteleraService,
				private userService: UserService,
				private dialog: MatDialog,
				private toasterService: ToasterService,
				private localStorageService: LocalStorageService) { }

	ngOnInit() {
		this.userService.getPostsCreados(this.localStorageService.getUserId())
            .subscribe(
                (postsCreados) => {
					this.posts = postsCreados;
					this.getCartelerasForPosts(this.posts);
					this.loaded = true;
                }
            );
	}

	getCartelerasForPosts(posts: Post[]): void {
        for (let post of posts) {
            this.requestCarteleraForPost(post);
        }
    }

    requestCarteleraForPost(post: Post) {
        this.carteleraService.getCarteleraForPost(post.id)
            .subscribe(
				/*
				"cartelerasForPosts" es un arreglo donde se guardan los "id" de las carteleras a la cual
				pertenecen los posts. El arreglo tiene como indices los "id" de los posts y como contenido
				los "id" para cada indice el "id" de la cartelera a la que pertenece el post
				Por ejemplo: si "post.id" es igual a '1' y "cartelera.id" es igual a '2'
				"this.cartelerasForPosts['1'] = '2'" significa que el post con "id: 1" pertenece
				a la cartelera con "id: 2"
				*/
                (cartelera: Cartelera) => this.cartelerasForPosts[post.id] = cartelera.id
            );
    }

	eliminarPost(post: Post) {
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
                                () => {
                                    this.removePost(post);
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

    removePost(post: Post) {
        let index = this.posts.indexOf(post);
        if (index > -1) {
            this.posts.splice(index, 1);
        }
    }

}
