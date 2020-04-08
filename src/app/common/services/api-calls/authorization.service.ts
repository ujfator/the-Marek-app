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

	async login(user: User): Promise<boolean> {
		return this.http.post<boolean>(`${environment.apiHost}/users/login`, user, this.jsonHeaders).toPromise().then(res => res);
	}

	getUsers(): void {
		this.http.get<string[]>(`${environment.apiHost}/users`, this.jsonHeaders).subscribe((users: string[]) => {
			this.authorizationStore.update({users: users});
		});
	}

	async getUser(user: User): Promise<User> {
		return this.http.get<User>(`${environment.apiHost}/users/${user.login}|${user.password}`, this.jsonHeaders).toPromise().then((user) => user);
	}

	createUser(user: User): void {
		this.http.post<User[]>(`${environment.apiHost}/users`, user, this.jsonHeaders).subscribe();
	}

	setUser(user: User): void {
		this.http.post<User>(`${environment.apiHost}/users`, JSON.stringify(user), this.jsonHeaders).subscribe();
	}

	authorizeOrInvalidateSession(isAuthorized: boolean) {
		this.authorizationStore.update({isAuthorized: isAuthorized});
		if (isAuthorized) this.router.navigate(['workflow-tab']);
		else this.router.navigate(['login']);
	}

}
