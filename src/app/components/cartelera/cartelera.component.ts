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
        dialogConfig.data = {
            id: '1', // HAY QUE CAMBIARLO
            title: post.title
        };

        const dialogRef = this.dialog.open(DeletePostComponent, dialogConfig);

        dialogRef.afterClosed()
            .subscribe(
                (result) => {
                    if (result) {
                        this.carteleraService.deletePublicacion('1') // HAY QUE CAMBIAR EL PARAMETRO
                            .subscribe(
                                (res) => {
                                    this.removePost(post);
                                    // No muestra el mensaje porque esta fallando removePost
                                    this.toasterService.success('Publicación eliminada');
                                }
                            );
                    }
                }
            );
    }

    removePost(post: any) {
        // Falla porque todavia no estan los posts, la cartelera deberia traer todos sus posts desde la api
        let index = this.cartelera.posts.indexOf(post);
        if (index > -1) {
            this.cartelera.posts.splice(index, 1);
        }
    }

}
