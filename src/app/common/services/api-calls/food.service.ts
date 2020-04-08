import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { Food } from 'server/models';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FoodService extends BaseService {

	items: Subject<Food[]> = new BehaviorSubject<Food[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	addItem(item: Food): void {
		this.http.post<Food>(`${environment.apiHost}/food`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	deleteItem(id: string): void {
		this.http.delete<Food>(`${environment.apiHost}/food/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	getItemById(id: string): Food {
		if (this._index) return this._index[id];
	}

	loadItems(): void {
		this.http.get<Food[]>(`${environment.apiHost}/food`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	patchItem(item: Food): void {
		this.http.patch<Food>(`${environment.apiHost}/food`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

	private _buildIndex(items: Food[]): void {
		const flattenHelper = (array: Food[]) => {
			return array.reduce((acc, item) => {
				acc[item.id] = item;

				return acc;
			}, {});
		};
 		this._index = flattenHelper(items);
	}
}
