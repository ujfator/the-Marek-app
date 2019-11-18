import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { FoodService } from '../common/services/food.service';
import { AuthorService } from '../common/services/author.service'
import { DialogService } from '../common/services/dialog.service';
import { Food } from 'server/models';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})

export class FoodComponent {

  public displayedColumns: string[] = ['date', 'breakfast', 'lunch', 'dinner', 'junkFood', 'author', 'edit'];
  public foodItems: Food[] = [];
  public allItems: Food[] = [];

  constructor(
    public dialog: MatDialog,
    public foodService: FoodService,
    public dialogService: DialogService,
    public authorService: AuthorService,
  ) {
    this.foodService.items.subscribe(async (items) => {
      if (items) {
        this.allItems = await [...items];
        if (localStorage.getItem('author')) {
          this.createDataSource(localStorage.getItem('author'))
        } else this.foodItems = [...items];
      }
    });
    
    this.dialogService.data.subscribe((data: any) => {
      if (data && data.origin === 'food') {
        const item = {...data.item};
        this.dialogService.data.next(null);
        if (item.id) {
          this.foodService.patchItem(item);
        } else this.foodService.addItem(item);
      };     
    });

    this.authorService.author.subscribe((author) => {
      if (author && author !== 'Oba') {
        this.createDataSource(author);
      } else if (author === 'Oba') this.foodItems = [...this.allItems];
    });
  }

  public addOrEditEntry(entry?: Food) {
    this.dialogService.data.next(null);
    this.dialogService.addEditItem('food', entry);
  }

  public createDataSource (author?: string) {
    this.foodItems = [];
    this.allItems && this.allItems.forEach(element => {
      if (element.author === author) this.foodItems.push(element);
    });
  }

  public delete(entry: Food) {
    this.foodService.deleteItem(entry.id);
  }

}
