import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { WorkflowModel } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable()
export class WorkflowService extends BaseService {

	public route = `${environment.apiHost || ''}/workflow`;
 	public items: Subject<WorkflowModel[]> = new BehaviorSubject<WorkflowModel[]>(null);

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
		console.log(('b' + 'a' + + 'a' + 'a').toLowerCase(), environment);
	}

	public deleteItem (id: string): void {
		this.http.delete<any>(this.route + '/' + id, this.jsonHeaders).subscribe(() => this.loadItems());
	}

  	public addItem(item: WorkflowModel): void {
		this.http.post<WorkflowModel>(this.route, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public loadItems(): void {
		console.log(environment);
		this.http.get<WorkflowModel[]>(this.route).subscribe((items) => this.items.next(items));
	}

	public patchItem(item: WorkflowModel): void {
		this.http.patch<WorkflowModel>(this.route, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

}
