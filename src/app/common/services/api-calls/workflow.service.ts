import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { Workflow } from 'server/models';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WorkflowService extends BaseService {

	route = `${environment.apiHost}/workflow`;
 	items: Subject<Workflow[]> = new BehaviorSubject<Workflow[]>(null);

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	deleteOldDoneItems(item: Workflow) {
		const now = new Date().getTime();
		const finishedDate = new Date(item.finished).getTime();
		const week = 1000 * 60 * 60 * 24 * 7;
		if (now - finishedDate > week) this.deleteItem(item.id);
	}

	deleteItem (id: string): void {
		this.http.delete<any>(this.route + '/' + id, this.jsonHeaders).subscribe(() => this.loadItems());
	}

  	addItem(item: Workflow): void {
		this.http.post<Workflow>(this.route, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	loadItems(): void {
		this.http.get<Workflow[]>(this.route).subscribe((items) => {
			this.items.next(items);
			items.forEach((item) => {
				if (item.finished) this.deleteOldDoneItems(item);
			});
		});
	}

	patchItem(item: Workflow): void {
		if (item.container === 'done') {
			item.finished = new Date()
		} else item.finished = null;
		this.http.patch<Workflow>(this.route, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

}
