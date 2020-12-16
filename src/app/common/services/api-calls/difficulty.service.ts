import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Difficulty } from 'server/models';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DifficultyService extends BaseService {
	difficulties: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	index: string[] = [];

	constructor(private http: HttpClient) {
		super();
		this.loadDifficulties();
	}

	ngOnInit(): void {
		this.loadDifficulties();
	}

	addDifficulty(difficulty: string): void {
		if (difficulty) {
			this.http
				.post<string>(`${environment.apiHost}/difficulty`, {
					difficulty,
				})
				.subscribe(() => this.loadDifficulties());
		}
	}

	loadDifficulties(): void {
		this.http.get<Difficulty[]>(`${environment.apiHost}/difficulty`).subscribe((items: Difficulty[]) => {
			this.buildIndex(items);
		});
	}

	private buildIndex(items: Difficulty[]): void {
		const flattenHelper = (array: Difficulty[]) => {
			return array.reduce((acc, difficulty) => {
				if (difficulty.difficulty) acc.push(difficulty.difficulty);
				return acc;
			}, []);
		};
		this.index = Array.from(new Set(flattenHelper(items)));
		this.difficulties.next(this.index);
	}
}
