import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { WorkflowItemModel } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable()
export class WorkflowManagerService extends BaseService {

	public route = `${environment.apiHost}/workflowManager`;
 	public items: Subject<WorkflowItemModel[]> = new BehaviorSubject<WorkflowItemModel[]>(null);

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	public deleteItem (id: string): void {
		this.http.delete<any>(this.route + '/' + id, this.jsonHeaders).subscribe(() => this.loadItems());
	}

  	public addItem(item: WorkflowItemModel): void {
		this.http.post<WorkflowItemModel>(this.route, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public loadItems(): void {
		console.log(environment);
		this.http.get<WorkflowItemModel[]>(this.route).subscribe((items) => this.items.next(items));
	}

	public patchItem(item: WorkflowItemModel): void {
		this.http.patch<WorkflowItemModel>(this.route, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

}
