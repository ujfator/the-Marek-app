import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SchoolService } from '../common/services/school.service';
import { AuthorService } from '../common/services/author.service'
import { DialogService } from '../common/services/dialog.service';
import { School } from 'server/models';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})

export class SchoolComponent {

  public displayedColumns: string[] = ['date', 'subject', 'typeOfTest', 'difficulty', 'author', 'edit'];
  public dataSource: School[] = [];
  public allItems: School[] = [];

  constructor(
    public dialog: MatDialog,
    public schoolService: SchoolService,
    public dialogService: DialogService,
    public authorService: AuthorService,
  ) {
    this.schoolService.items.subscribe(async (items) => {
      console.log(items);
      if (items) {
        this.allItems = await [...items];
        if (localStorage.getItem('author')) {
          this.createDataSource(localStorage.getItem('author'))
        } else this.dataSource = [...items];
      }
    });
    
    this.dialogService.data.subscribe((data: any) => {
      if (data && data.origin === 'school') {
        const item = {...data.item};
        this.dialogService.data.next(null);
        if (item.id) {
          this.schoolService.patchItem(item);
        } else this.schoolService.addItem(item);
      };     
    });

    this.authorService.author.subscribe((author) => {
      if (author && author !== 'Oba') {
        this.createDataSource(author);
      } else if (author === 'Oba') this.dataSource = [...this.allItems];
    });
  }

  public addOrEditEntry(entry?: School) {
    this.dialogService.data.next(null);
    this.dialogService.addEditItem('school', entry);
  }

  public createDataSource (author?: string) {
    this.dataSource = [];
    this.allItems && this.allItems.forEach(element => {
      if (element.author === author) this.dataSource.push(element);
    });
  }

  public delete(entry: School) {
    this.schoolService.deleteItem(entry.id);
  }

}
