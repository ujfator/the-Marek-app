import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SportModel } from 'server/models';
import { SportService } from '../common/services/sport.service';
import { DialogService } from '../common/services/dialog.service';
import { AuthorService } from '../common/services/author.service';
import { DifficultyService } from '../common/services/difficulty.service';


@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})

export class SportComponent {

  displayedColumns: string[] = ['date', 'sport', 'difficulty', 'duration', 'author', 'edit'];
  sportItems: SportModel[] = [];
  allItems: SportModel[] = [];

  constructor(
    protected dialog: MatDialog,
    protected sportService: SportService,
    protected dialogService: DialogService,
    protected authorService: AuthorService,
    protected difficultyService: DifficultyService,
  ) {
    this.sportService.items.subscribe(async (items) => {
      if (items) {
        this.allItems = await [...items];
        if (localStorage.getItem('author')) {
          this.createDataSource(localStorage.getItem('author'))
        } else this.sportItems = [...items];
      }
    });
    
    this.dialogService.data.subscribe((data: any) => {
      if (data && data.origin === 'sport') {
        const item = {...data.item};
        this.dialogService.data.next(null);
        if (item.id) {
          this.sportService.patchItem(item);
        } else this.sportService.addItem(item);
        if (item['difficulty']) this.difficultyService.addDifficulty(item['difficulty']);
      };     
    });

    this.authorService.author.subscribe((author) => {
      if (author && author !== 'Oba') {
        this.createDataSource(author);
      } else if (author === 'Oba') this.sportItems = [...this.allItems];
    });
  }

  addOrEditEntry(entry?: SportModel) {
    this.dialogService.data.next(null);
    this.dialogService.addEditItem('sport', entry);
  }

  createDataSource (author?: string) {
    this.sportItems = [];
    this.allItems && this.allItems.forEach(element => {
      if (element.author === author) this.sportItems.push(element);
    });
  }

  delete(entry: SportModel) {
    this.sportService.deleteItem(entry.id);
  }

  minutes(element): string {
    if (element) {
      if (element.duration > 1) {
        return 'minutes'
      } else return 'minute'
    }
  }

}
