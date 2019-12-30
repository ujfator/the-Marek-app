import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'server/models/user.model';
import {BaseService} from './base.service';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService extends BaseService {

    public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    // constructor(
    // 	super();
	// ) {
    //     if (sessionStorage.getItem('user')) this.user.next(JSON.parse(sessionStorage.getItem('user')))
    // }

    // public login(user: User) {
	// 	this.http.post<string>(`${environment.apiHost}/login`, JSON.stringify(user), this.jsonHeaders).subscribe(
	// 		(res) => console.log(res)
	// 	);
    // }

}
