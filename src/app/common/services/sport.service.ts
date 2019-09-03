import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { SportItemModel } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable()
export class SportService extends BaseService {

	public items: Subject<SportItemModel[]> = new BehaviorSubject<SportItemModel[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	public addItem(item: SportItemModel): void {
		this.http.post<SportItemModel>(`${environment.apiHost || ''}/sport`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public deleteItem(id: string): void {
		this.http.delete<SportItemModel>(`${environment.apiHost|| '' }/sport/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public getMoneyItemById(id: string): SportItemModel {
		if (this._index) {
			return this._index[id];
		}
	}

	public loadItems(): void {
		this.http.get<SportItemModel[]>(`${environment.apiHost || ''}/sport`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	public patchItem(item: SportItemModel): void {
		this.http.patch<SportItemModel>(`${environment.apiHost || ''}/sport`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

	private _buildIndex(items: SportItemModel[]): void {
		const flattenHelper = (array: SportItemModel[]) => {
			return array.reduce((acc, MoneyItem) => {
				acc[MoneyItem.id] = MoneyItem;

				return acc;
			}, {});
		};
 		this._index = flattenHelper(items);
	}
}
