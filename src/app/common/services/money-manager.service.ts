import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { MoneyItemModel } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable()
export class MoneyManagerService extends BaseService {

	public items: Subject<MoneyItemModel[]> = new BehaviorSubject<MoneyItemModel[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
		console.log(environment);
	}

	public addItem(item: MoneyItemModel): void {
		this.http.post<MoneyItemModel>(`/moneyManager`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public deleteItem(id: string): void {
		this.http.delete<MoneyItemModel>(`/moneyManager/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public getMoneyItemById(id: string): MoneyItemModel {
		if (this._index) {
			return this._index[id];
		}
	}

	public loadItems(): void {
		this.http.get<MoneyItemModel[]>(`/moneyManager`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	public patchItem(item: MoneyItemModel): void {
		this.http.patch<MoneyItemModel>(`/moneyManager`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

	private _buildIndex(items: MoneyItemModel[]): void {
		const flattenHelper = (array: MoneyItemModel[]) => {
			return array.reduce((acc, MoneyItem) => {
				acc[MoneyItem.id] = MoneyItem;

				return acc;
			}, {});
		};
 		this._index = flattenHelper(items);
	}
}
