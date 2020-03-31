import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationStore } from 'src/app/state-management/authorization/authorization.store';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {

    constructor(
		private authorizationStore: AuthorizationStore,
		private router: Router,
	) {
    }

	authorizeOrInvalidateSession(isAuthorized: boolean) {
		this.authorizationStore.update({isAuthorized: isAuthorized});
		this.router.navigate(['workflow-tab']);
	}

}
