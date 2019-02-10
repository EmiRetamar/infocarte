import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { CarteleraService } from '../../services/cartelera.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';

@Component({
    selector: 'info-cartelera',
    templateUrl: './cartelera.component.html',
    styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {

    cartelera: any;
    posts: any;

    constructor(private carteleraService: CarteleraService,
                private router: Router,
                private route: ActivatedRoute,
                private dialog: MatDialog,
                private toasterService: ToasterService,
                public localStorageService: LocalStorageService) { }

    ngOnInit() {
        let idCartelera: string;
        idCartelera = this.route.snapshot.paramMap.get('idCartelera');
        this.carteleraService.getCartelera(idCartelera)
            .subscribe(
                (cartelera) => {
                    this.cartelera = cartelera;
                    this.carteleraService.getPosts(idCartelera)
                        .subscribe(
                            (posts) => {
                                this.posts = posts;
                            }
                        )
                }
            );
    }

    eliminarPost(post: any) {
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
                                (res) => {
                                    this.removePost(this.posts, post);
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

    removePost(posts: any[], post: any) {
        let index = posts.indexOf(post);
        if (index > -1) {
            posts.splice(index, 1);
        }
    }

}
