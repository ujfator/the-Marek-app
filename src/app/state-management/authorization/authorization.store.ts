import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { User } from 'server/models/user.model';

export interface AuthorizationState {
	   isAuthorized: boolean;
	   users: string[];
	   selectedUser: string;
}

export function createInitialState(): AuthorizationState {
	return {
		isAuthorized: false,
		users: [],
		selectedUser: null,
	};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'authorization' })
export class AuthorizationStore extends Store<AuthorizationState> {

	constructor() {
		super(createInitialState());
	}
}
