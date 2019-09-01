import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AuthorService {

	public author: Subject<string> = new BehaviorSubject<string>(null);

    constructor() {}
    
    public selectAuthor (author: string) {
        this.author.next(author);
    }

}
