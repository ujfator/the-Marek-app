import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DifficultyModel } from 'server/models';

@Injectable()
export class DifficultyService {

    public difficulties: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    public index: string[] = [];

    constructor(private http: HttpClient) {
        this.loadDifficulties();
    }
    
    public addDifficulty(difficulty: string): void {
      if (difficulty) {
        this.http.post<string>(`${environment.apiHost}/difficulty`, {difficulty}).subscribe(() => this.loadDifficulties());
      }
    }
    
    public loadDifficulties(): void {
		    this.http.get<DifficultyModel[]>(`${environment.apiHost}/difficulty`).subscribe((items: DifficultyModel[]) => {
          this.buildIndex(items);
        });
    }

    private buildIndex(items: DifficultyModel[]): void {
      const flattenHelper = (array: DifficultyModel[]) => {
        return array.reduce((acc, difficulty) => {
          if (difficulty.difficulty) acc.push(difficulty.difficulty);
          return acc;
        }, []);
      };
      this.index = Array.from(new Set(flattenHelper(items)));
      this.difficulties.next(this.index);
    }

}