import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { SportModel } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable()
export class SportService extends BaseService {

	public items: Subject<SportModel[]> = new BehaviorSubject<SportModel[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	public addItem(item: SportModel): void {
		this.http.post<SportModel>(`${environment.apiHost || ''}/sport`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public deleteItem(id: string): void {
		this.http.delete<SportModel>(`${environment.apiHost|| '' }/sport/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public getSportItemById(id: string): SportModel {
		if (this._index) return this._index[id];
	}

	public loadItems(): void {
		this.http.get<SportModel[]>(`${environment.apiHost || ''}/sport`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	public patchItem(item: SportModel): void {
		this.http.patch<SportModel>(`${environment.apiHost || ''}/sport`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

	private _buildIndex(items: SportModel[]): void {
		const flattenHelper = (array: SportModel[]) => {
			return array.reduce((acc, sportItem) => {
				acc[sportItem.id] = sportItem;

				return acc;
			}, {});
		};
 		this._index = flattenHelper(items);
	}
}
