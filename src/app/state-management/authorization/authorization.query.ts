import { Query } from '@datorama/akita';
import { AuthorizationState, AuthorizationStore } from './authorization.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthorizationQuery extends Query<AuthorizationState> {
	isAuthorized = this.select('isAuthorized');
	users = this.select('users');
	selectedUser = this.select('selectedUser');

	constructor(protected store: AuthorizationStore) {
		super(store);
	}
}
