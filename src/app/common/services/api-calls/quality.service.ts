import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { Quality } from 'server/models';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class QualityService extends BaseService {
	items: Subject<Quality[]> = new BehaviorSubject<Quality[]>(null);
	private _index: object;

	constructor(private http: HttpClient) {
		super();
		this.loadItems();
	}

	addItem(item: Quality): void {
		this.http
			.post<Quality>(`${environment.apiHost}/quality`, JSON.stringify(item), this.jsonHeaders)
			.subscribe(() => this.loadItems());
	}

	deleteItem(id: string): void {
		this.http
			.delete<Quality>(`${environment.apiHost}/quality/${id}`, this.jsonHeaders)
			.subscribe(() => this.loadItems());
	}

	getQualityItemById(id: string): Quality {
		if (this._index) return this._index[id];
	}

	loadItems(): void {
		this.http.get<Quality[]>(`${environment.apiHost}/quality`).subscribe((items) => {
			this.items.next(items);
			this._buildIndex(items);
		});
	}

	patchItem(item: Quality): void {
		this.http
			.patch<Quality>(
				`${environment.apiHost}/quality`,
				JSON.stringify(item),
				this.jsonHeaders,
			)
			.subscribe(() => this.loadItems());
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
