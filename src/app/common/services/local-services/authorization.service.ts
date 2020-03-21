import { Injectable } from '@angular/core';
import { AuthorizationStore } from 'src/app/state-management/store/authorization.store';
import { Router } from '@angular/router';

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
