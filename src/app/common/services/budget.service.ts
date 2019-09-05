import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { BudgetItemModel } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable()
export class BudgetService extends BaseService {

	public items: Subject<BudgetItemModel[]> = new BehaviorSubject<BudgetItemModel[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	public addItem(item: BudgetItemModel): void {
		this.http.post<BudgetItemModel>(`${environment.apiHost}/budget`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public deleteItem(id: string): void {
		this.http.delete<BudgetItemModel>(`${environment.apiHost}/budget/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public getBudgetItemById(id: string): BudgetItemModel {
		if (this._index) {
			return this._index[id];
		}
	}

	public loadItems(): void {
		this.http.get<BudgetItemModel[]>(`${environment.apiHost}/budget`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	public patchItem(item: BudgetItemModel): void {
		this.http.patch<BudgetItemModel>(`${environment.apiHost}/budget`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

	private _buildIndex(items: BudgetItemModel[]): void {
		const flattenHelper = (array: BudgetItemModel[]) => {
			return array.reduce((acc, BudgetItem) => {
				acc[BudgetItem.id] = BudgetItem;

				return acc;
			}, {});
		};
 		this._index = flattenHelper(items);
	}
}
