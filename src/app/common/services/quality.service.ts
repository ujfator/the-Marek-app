import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { Quality } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable()
export class QualityService extends BaseService {

	public items: Subject<Quality[]> = new BehaviorSubject<Quality[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	public addItem(item: Quality): void {
		this.http.post<Quality>(`${environment.apiHost || ''}/quality`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public deleteItem(id: string): void {
		this.http.delete<Quality>(`${environment.apiHost|| '' }/quality/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public getQualityItemById(id: string): Quality {
		if (this._index) return this._index[id];
	}

	public loadItems(): void {
		this.http.get<Quality[]>(`${environment.apiHost || ''}/quality`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	public patchItem(item: Quality): void {
		this.http.patch<Quality>(`${environment.apiHost || ''}/quality`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

	private _buildIndex(items: Quality[]): void {
		const flattenHelper = (array: Quality[]) => {
			return array.reduce((acc, item) => {
				acc[item.id] = item;

				return acc;
			}, {});
		};
 		this._index = flattenHelper(items);
	}
}
