import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationStore } from 'src/app/state-management/authorization/authorization.store';
import { BaseService } from './base.service';
import { User } from 'server/models/user.model';
import { environment } from 'src/app/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthorizationService extends BaseService {

    constructor(
		private authorizationStore: AuthorizationStore,
		private router: Router,
		private http: HttpClient,
	) {
		super();
		this.getUsers();
	}

	selectAuthor(author: string) {
		this.authorizationStore.update({selectedUser: author})
	}

	getUsers(): void {
		this.http.get<User[]>(`${environment.apiHost || ''}/users`, this.jsonHeaders).subscribe((users: User[]) => {
			const userNames = users.reduce((acc, user) => {
				acc.push(user.login);
				return acc;
			}, []);
			this.authorizationStore.update({users: userNames});
		});
	}

	async getUser(login: string): Promise<User> {
		return this.http.get<User>(`${environment.apiHost || ''}/users/${login}`, this.jsonHeaders).toPromise().then((user) => user);
	}

	setUser(user: User): void {
		this.http.post<User>(`${environment.apiHost || ''}/users`, JSON.stringify(user), this.jsonHeaders).subscribe();
	}

	authorizeOrInvalidateSession(isAuthorized: boolean) {
		this.authorizationStore.update({isAuthorized: isAuthorized});
		this.router.navigate(['workflow-tab']);
	}

}
