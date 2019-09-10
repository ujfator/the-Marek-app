import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SportService, DialogService, AuthorService, DifficultyService } from '../common/services';
import { SportItemModel } from 'server/models';


@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})

export class SportComponent {

  public displayedColumns: string[] = ['date', 'sport', 'difficulty', 'author', 'edit'];
  public sportItems: SportItemModel[] = [];
  public allItems: SportItemModel[] = [];

  constructor(
    public dialog: MatDialog,
    public sportService: SportService,
    public dialogService: DialogService,
    public authorService: AuthorService,
    public difficultyService: DifficultyService,
  ) {
    this.sportService.items.subscribe(async (items) => {
      if (items) {
        this.allItems = await [...items];
        if (localStorage.getItem('author')) {
          this.createDataSource(localStorage.getItem('author'))
        } else this.sportItems = [...items];
      }
    });
    
    this.dialogService.data.subscribe((data: SportItemModel) => {
      if (data) {
        if (data.id) {
          this.sportService.patchItem(data);
        } else this.sportService.addItem(data);
        if (data.difficulty) this.difficultyService.addDifficulty(data.difficulty);
      };
    });

    this.authorService.author.subscribe((author) => {
      if (author && author !== 'Oba') {
        this.createDataSource(author);
      } else if (author === 'Oba') this.sportItems = [...this.allItems];
    });
  }

  public addOrEditEntry(entry?: SportItemModel) {
    this.dialogService.data.next(null);
    this.dialogService.addEditItem('sport', entry);
  }

  public createDataSource (author?: string) {
    this.sportItems = [];
    this.allItems && this.allItems.forEach(element => {
      if (element.author === author) this.sportItems.push(element);
    });
  }

  public delete(entry: SportItemModel) {
    this.sportService.deleteItem(entry.id);
  }

}
