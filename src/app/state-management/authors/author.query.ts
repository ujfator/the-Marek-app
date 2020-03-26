import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AuthorStore, AuthorState } from './author.store';

@Injectable({ providedIn: 'root' })
export class AuthorQuery extends Query<AuthorState> {

	authors = this.select('authors');

	constructor(protected store: AuthorStore) {
		super(store);
	}
}
