import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { School } from 'server/models';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SchoolService extends BaseService {

	items: Subject<School[]> = new BehaviorSubject<School[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	addItem(item: School): void {
		this.http.post<School>(`${environment.apiHost}/school`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	deleteItem(id: string): void {
		this.http.delete<School>(`${environment.apiHost|| '' }/school/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	getItemById(id: string): School {
		if (this._index) return this._index[id];
	}

	loadItems(): void {
		this.http.get<School[]>(`${environment.apiHost}/school`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	patchItem(item: School): void {
		this.http.patch<School>(`${environment.apiHost}/school`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
	}

	private _buildIndex(items: School[]): void {
		const flattenHelper = (array: School[]) => {
			return array.reduce((acc, item) => {
				acc[item.id] = item;

				return acc;
			}, {});
		};
 		this._index = flattenHelper(items);
	}
}
