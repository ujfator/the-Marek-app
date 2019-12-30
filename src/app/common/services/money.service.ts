import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { Money } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MoneyService extends BaseService {

	public items: Subject<Money[]> = new BehaviorSubject<Money[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	public addItem(item: Money): void {
		this.http.post<Money>(`${environment.apiHost || ''}/money`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public deleteItem(id: string): void {
		this.http.delete<Money>(`${environment.apiHost|| '' }/money/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public getMoneyItemById(id: string): Money {
		if (this._index) return this._index[id];
	}

	public loadItems(): void {
		this.http.get<Money[]>(`${environment.apiHost || ''}/money`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	public patchItem(item: Money): void {
		this.http.patch<Money>(`${environment.apiHost || ''}/money`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
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
