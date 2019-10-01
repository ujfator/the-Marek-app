import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SportItemModel } from 'server/models';
import { ItemToSave } from '../common/interfaces';
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

  public displayedColumns: string[] = ['date', 'sport', 'difficulty', 'duration', 'author', 'edit'];
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
      console.log(items);
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
