import { Component } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

	form: FormGroup;
	heslo: string;

	constructor(
		private router: Router,
	) { }

	login(): void {
		if (this.heslo.toLowerCase() === 'alza') {
			sessionStorage.setItem('alza', 'ahoj');
			this.router.navigate(['workflow-tab'])
		}
	}

}
