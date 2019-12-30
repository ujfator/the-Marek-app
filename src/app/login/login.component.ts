import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '../../../server/models/user.model';
import {LoginService} from '../common/services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

	form: FormGroup;

	constructor(
		private loginService: LoginService
	) { }

	onSubmit(): void {
		if (this.form.valid) {
			const login: User = {
				username: this.form.value.username,
				login: this.form.value.login
			};
			this.loginService.login(login)
		}
	}

}
