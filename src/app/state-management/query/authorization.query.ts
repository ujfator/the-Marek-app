import { Query } from '@datorama/akita';
import { AuthorizationState, AuthorizationStore } from '../store/authorization.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthorizationQuery extends Query<AuthorizationState> {

	isAuthorized = this.select('isAuthorized');

	constructor(protected store: AuthorizationStore) {
		super(store);
	}
}
