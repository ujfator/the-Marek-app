import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DifficultyService {

    public difficulties: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);

    constructor(private http: HttpClient) {
        this.loadDifficulties();
    }
    
    public addDifficulty(difficulty: string): void {
		this.http.post<string>(`${environment.apiHost}/difficulty`, difficulty).subscribe(() => this.loadDifficulties());
    }
    
    public loadDifficulties(): void {
		this.http.get<string[]>(`${environment.apiHost}/difficulty`).subscribe((items) => {
			this.difficulties.next(items);
		});
	}

}