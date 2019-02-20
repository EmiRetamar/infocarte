import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'info-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

	user: any;
	editUserForm: FormGroup;

	constructor(private userService: UserService,
				private formBuilder: FormBuilder,
				private router: Router,
				private route: ActivatedRoute) { }

	ngOnInit() {
		let idUser: string;
		idUser = this.route.snapshot.paramMap.get('idUser');
		this.userService.getUserById(idUser)
			.subscribe(
				(user) => {
					this.user = user;
				}
			);
		this.editUserForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			image: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
		});
	}

}
