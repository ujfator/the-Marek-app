import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { WorkflowItemModel } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable()
export class WorkflowManagerService extends BaseService {

  public items: Subject<WorkflowItemModel[]> = new BehaviorSubject<WorkflowItemModel[]>(null);

	constructor(
		private http: HttpClient
	) {
		super();
  }

  public addItem(item: WorkflowItemModel): void {
		this.http.post<WorkflowItemModel>(`${environment.apiHost}/workflowManager`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public loadItems(): void {
		this.http.get<WorkflowItemModel[]>(`${environment.apiHost}/workflowManager/workflowManager`).subscribe((items) => {
			this.items.next(items);
		});
	}

	public patchItem(item: WorkflowItemModel): void {
		this.http.patch<WorkflowItemModel>(`${environment.apiHost}/workflowManager/workflowManager`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

}
