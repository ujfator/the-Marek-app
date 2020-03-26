import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface AuthorizationState {
   	isAuthorized: boolean;
}

export function createInitialState(): AuthorizationState {
	return {
		isAuthorized: false,
	};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'authorization' })
export class AuthorizationStore extends Store<AuthorizationState> {

	constructor() {
		super(createInitialState());
	}
}
