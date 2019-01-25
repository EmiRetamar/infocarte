import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'info-delete-cartelera',
    templateUrl: './delete-cartelera.component.html',
    styleUrls: ['./delete-cartelera.component.css']
})
export class DeleteCarteleraComponent implements OnInit {

    modalTitle: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.modalTitle = data.title;
    }

    ngOnInit() { }

}
