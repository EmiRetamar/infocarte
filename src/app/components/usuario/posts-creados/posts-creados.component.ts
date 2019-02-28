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
	cartelerasForPosts: Cartelera[] = new Array();

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
                (cartelera: Cartelera) => this.cartelerasForPosts[post.id] = cartelera
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
