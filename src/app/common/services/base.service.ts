import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {
	public jsonHeaders = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
}
