import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Difficulty } from 'server/models';

@Injectable({ providedIn: 'root' })
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
