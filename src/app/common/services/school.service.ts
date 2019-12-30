import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { School } from 'server/models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SchoolService extends BaseService {

	public items: Subject<School[]> = new BehaviorSubject<School[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	public addItem(item: School): void {
		this.http.post<School>(`${environment.apiHost || ''}/school`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public deleteItem(id: string): void {
		this.http.delete<School>(`${environment.apiHost|| '' }/school/${id}`, this.jsonHeaders).subscribe(() => this.loadItems());
	}

	public getItemById(id: string): School {
		if (this._index) return this._index[id];
	}

	public loadItems(): void {
		this.http.get<School[]>(`${environment.apiHost || ''}/school`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	public patchItem(item: School): void {
		this.http.patch<School>(`${environment.apiHost || ''}/school`, JSON.stringify(item), this.jsonHeaders).subscribe(() => this.loadItems())
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
