import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'info-delete-comentario',
    templateUrl: './delete-comentario.component.html',
    styleUrls: ['./delete-comentario.component.css']
})
export class DeleteComentarioComponent implements OnInit {

    modalTitle: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.modalTitle = data.title;
    }

    ngOnInit() { }

}
