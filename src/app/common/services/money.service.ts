import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { MoneyModel } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable()
export class MoneyService extends BaseService {

	public items: Subject<MoneyModel[]> = new BehaviorSubject<MoneyModel[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	public addItem(item: MoneyModel): void {
		this.http.post<MoneyModel>(`${environment.apiHost || ''}/money`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public deleteItem(id: string): void {
		this.http.delete<MoneyModel>(`${environment.apiHost|| '' }/money/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public getMoneyItemById(id: string): MoneyModel {
		if (this._index) return this._index[id];
	}

	public loadItems(): void {
		this.http.get<MoneyModel[]>(`${environment.apiHost || ''}/money`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	public patchItem(item: MoneyModel): void {
		this.http.patch<MoneyModel>(`${environment.apiHost || ''}/money`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

	private _buildIndex(items: MoneyModel[]): void {
		const flattenHelper = (array: MoneyModel[]) => {
			return array.reduce((acc, MoneyItem) => {
				acc[MoneyItem.id] = MoneyItem;

				return acc;
			}, {});
		};
 		this._index = flattenHelper(items);
	}
}
