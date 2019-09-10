import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DifficultyModel } from 'server/models';

@Injectable()
export class DifficultyService {

    public difficulties: BehaviorSubject<DifficultyModel[]> = new BehaviorSubject<DifficultyModel[]>([]);

    constructor(private http: HttpClient) {
        this.loadDifficulties();
    }
    
    public addDifficulty(difficulty: string): void {
		this.http.post<string>(`${environment.apiHost}/difficulty`, {difficulty}).subscribe(() => this.loadDifficulties());
    }
    
    public loadDifficulties(): void {
		this.http.get<DifficultyModel[]>(`${environment.apiHost}/difficulty`).subscribe((items: DifficultyModel[]) => {
        this.difficulties.next(items);
		});
	}

}