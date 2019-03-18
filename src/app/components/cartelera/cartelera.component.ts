import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { CarteleraService } from '../../services/cartelera.service';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { Cartelera } from '../../models/cartelera';
import { Post } from '../../models/post';

@Component({
    selector: 'info-cartelera',
    templateUrl: './cartelera.component.html',
    styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {

    cartelera: Cartelera;
    posts: Post[];
    postsUser: Post[];
    cartelerasWithPermissions: Cartelera[] = new Array();
    loaded = false;

    constructor(private carteleraService: CarteleraService,
                private userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private dialog: MatDialog,
                private toasterService: ToasterService,
                private localStorageService: LocalStorageService) { }

    ngOnInit() {
        let idCartelera: string;
        idCartelera = this.route.snapshot.paramMap.get('idCartelera');
        this.carteleraService.getCartelera(idCartelera)
            .subscribe((cartelera) => {
                this.cartelera = cartelera;
                this.carteleraService.getPosts(idCartelera)
                    .subscribe((postsBillboard) => {
                        this.posts = postsBillboard;
                        if (this.localStorageService.getToken()) {
                            this.userService.getPostsUser(this.localStorageService.getUserId())
                                .subscribe((postsUser) => {
                                    this.postsUser = postsUser;
                                    if (this.userService.hasAuthority('PROFESOR', this.localStorageService.getAuthorities())) {
                                        this.requestCartelerasWithPermissions(this.localStorageService.getUserId());
                                        setTimeout(() => this.loaded = true, 1000);
                                    }
                                    else {
                                        this.loaded = true;
                                    }
                                });
                        }
                        else {
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
    }

	requestCartelerasWithPermissions(idProfesor: string) {
		this.userService.getPermissions(idProfesor)
			.subscribe(
				(permissions) => {
					for (let permission of permissions) {
						this.userService.getBillboardForPermission(permission.id)
							.subscribe(
								(cartelera: Cartelera) => {
									this.cartelerasWithPermissions[cartelera.id] = cartelera;
								}
							);
					}
				}
			);
    }

    hasPermissions() {
        return (this.cartelerasWithPermissions[this.cartelera.id] != undefined);
    }

    isMyPost(postActual: Post) {
        for (let post of this.postsUser) {
            if (post.id == postActual.id)
                return true;
        }
        return false;
    }

    eliminarPost(post: Post) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        //dialogConfig.height = '12em';
        //dialogConfig.width = '18em';
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
