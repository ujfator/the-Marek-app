import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { Budget } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable()
export class BudgetService extends BaseService {

	public items: Subject<Budget[]> = new BehaviorSubject<Budget[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	public addItem(item: Budget): void {
		this.http.post<Budget>(`${environment.apiHost}/budget`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public deleteItem(id: string): void {
		this.http.delete<Budget>(`${environment.apiHost}/budget/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public getBudgetById(id: string): Budget {
		if (this._index) return this._index[id];
	}

	public loadItems(): void {
		this.http.get<Budget[]>(`${environment.apiHost}/budget`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	public patchItem(item: Budget): void {
		this.http.patch<Budget>(`${environment.apiHost}/budget`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

	private _buildIndex(items: Budget[]): void {
		const flattenHelper = (array: Budget[]) => {
			return array.reduce((acc, Budget) => {
				acc[Budget.id] = Budget;

				return acc;
			}, {});
		};
 		this._index = flattenHelper(items);
	}
}
