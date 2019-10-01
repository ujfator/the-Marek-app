import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { FoodModel } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable()
export class FoodService extends BaseService {

	public items: Subject<FoodModel[]> = new BehaviorSubject<FoodModel[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	public addItem(item: FoodModel): void {
		this.http.post<FoodModel>(`${environment.apiHost || ''}/food`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public deleteItem(id: string): void {
		this.http.delete<FoodModel>(`${environment.apiHost|| '' }/food/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public getItemById(id: string): FoodModel {
		if (this._index) return this._index[id];
	}

	public loadItems(): void {
		this.http.get<FoodModel[]>(`${environment.apiHost || ''}/food`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	public patchItem(item: FoodModel): void {
		this.http.patch<FoodModel>(`${environment.apiHost || ''}/food`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

	private _buildIndex(items: FoodModel[]): void {
		const flattenHelper = (array: FoodModel[]) => {
			return array.reduce((acc, item) => {
				acc[item.id] = item;

				return acc;
			}, {});
		};
 		this._index = flattenHelper(items);
	}
}
