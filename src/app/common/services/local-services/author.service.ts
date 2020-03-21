import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthorService {

    author: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor() {
        if (localStorage.getItem('author') && localStorage.getItem('author') !== 'Oba') this.author.next(localStorage.getItem('author'))
    }

    selectAuthor (author: string) {
        this.author.next(author);
        if (author !== 'Oba') {
            localStorage.setItem('author', author)
        } else localStorage.removeItem('author');
    }

}