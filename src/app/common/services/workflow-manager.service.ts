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
		this.loadItems();
  }

  public addItem(item: WorkflowItemModel): void {
		this.http.post<WorkflowItemModel>(`${environment.apiHost}/workflowManager`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public loadItems(): void {
		this.http.get<WorkflowItemModel[]>(`${environment.apiHost}/workflowManager`).subscribe((items) => {
			this.items.next(items);
		});
	}

	public async patchItem(item: WorkflowItemModel): Promise<void> {
		console.log(item);
		this.http.patch<WorkflowItemModel>(`${environment.apiHost}/workflowManager`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

}
