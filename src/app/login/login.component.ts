import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthorizationService } from '../common/services/api-calls/authorization.service';
import { AuthorizationQuery } from '../state-management/authorization/authorization.query';
import { WorkflowService } from '../common/services/api-calls/workflow.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

	form: FormGroup;
	login: string;
	password: string;
	users: string[];
	showPassword: boolean;

	constructor(
		private authorizationService: AuthorizationService,
		private authorizationQuery: AuthorizationQuery,
		private service: WorkflowService,
	) {
		this.service.loadItems();
		this.authorizationQuery.users.subscribe((users) => this.users = users);
	}

	checkForUser(e) {
		console.log(e);
		if (this.users.find(user => user === e)) this.showPassword = true;
	}

	logIn(): void {
		this.authorizationService.login({login: this.login, password: this.password}).then((res) => {
			if (res) this.authorizationService.authorizeOrInvalidateSession(true);
		});
	}

}
