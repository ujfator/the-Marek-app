import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseService {
	public jsonHeaders = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	public http: HttpClient;
}
