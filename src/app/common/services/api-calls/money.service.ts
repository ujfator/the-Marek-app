import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { Money } from 'server/models';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MoneyService extends BaseService {

	items: Subject<Money[]> = new BehaviorSubject<Money[]>(null);
	private _index: object;

	constructor( private http: HttpClient) {
		super();
		this.loadItems();
	}

	addItem(item: Money): void {
		this.http.post<Money>(`${environment.apiHost}/money`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	deleteItem(id: string): void {
		this.http.delete<Money>(`${environment.apiHost}/money/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	getMoneyItemById(id: string): Money {
		if (this._index) return this._index[id];
	}

	loadItems(): void {
		console.log('hej')
		this.http.get<Money[]>(`${environment.apiHost}/money`).subscribe((items) => {
			console.log(items);
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	patchItem(item: Money): void {
		this.http.patch<Money>(`${environment.apiHost}/money`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

	private _buildIndex(items: Money[]): void {
		const flattenHelper = (array: Money[]) => {
			return array.reduce((acc, MoneyItem) => {
				acc[MoneyItem.id] = MoneyItem;

				return acc;
			}, {});
		};
 		this._index = flattenHelper(items);
	}
}
