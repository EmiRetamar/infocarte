import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'info-delete-post',
    templateUrl: './delete-post.component.html',
    styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

    modalTitle: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.modalTitle = data.title;
    }

    ngOnInit() { }

}
