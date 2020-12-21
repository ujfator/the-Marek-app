import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationQuery } from 'src/app/state-management/authorization/authorization.query';

@Injectable({
	providedIn: 'root',
})
export class LoginGuard implements CanActivate {
	isAuthorized: boolean = false;

	constructor(private router: Router, private authorizationQuery: AuthorizationQuery) {
		this.authorizationQuery.isAuthorized.subscribe(
			(isAuthorized) => (this.isAuthorized = isAuthorized),
		);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.isAuthorized) {
			this.router.navigate(['workflow-tab']);
			return false;
		}
		return true;
	}
}
