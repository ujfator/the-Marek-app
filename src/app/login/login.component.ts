import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthorizationService } from '../common/services/api-calls/authorization.service';
import { AuthorizationQuery } from '../state-management/authorization/authorization.query';
import { WorkflowService } from '../common/services/api-calls/workflow.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	loginForm = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
	});

	users: string[];
	showPassword: boolean;
	validLogin: boolean = true;
	matcher = new MyErrorStateMatcher();

	constructor(
		private authorizationService: AuthorizationService,
		private authorizationQuery: AuthorizationQuery,
		private service: WorkflowService,
	) {
		this.service.loadItems();
		this.authorizationQuery.users.subscribe((users) => (this.users = users));
	}

	checkForUser(e) {
		if (this.users.find((user) => user === e)) this.showPassword = true;
	}

	clearInput(field: string): void {
		this.loginForm.controls[field].reset();
	}

	logIn(): void {
		const formValue = this.loginForm.value;
		this.authorizationService
			.login({ login: formValue.username, password: formValue.password })
			.then((res: boolean) => {
				this.validLogin = res;
				this.authorizationService.authorizeOrInvalidateSession(res);
			});
	}
}
