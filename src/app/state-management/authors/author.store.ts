import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface AuthorState {
   	authors: string[];
}

export function createInitialState(): AuthorState {
	return {
		authors: ['Terezka', 'Marek'],
	};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'author' })
export class AuthorStore extends Store<AuthorState> {

	constructor() {
		super(createInitialState());
	}
}
