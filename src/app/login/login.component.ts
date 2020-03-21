import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthorizationService } from '../common/services/local-services/authorization.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

	form: FormGroup;
	heslo: string;

	constructor(
		private authorizationService: AuthorizationService,
	) {
	}

	login(): void {
		if (this.heslo.toLowerCase() === 'alza') {
			this.authorizationService.authorizeOrInvalidateSession(true);
		}
	}

}
