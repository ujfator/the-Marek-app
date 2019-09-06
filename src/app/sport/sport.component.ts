import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SportService, DialogService } from '../common/services';
import { SportItemModel } from 'server/models';


@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})

export class SportComponent {

  public displayedColumns: string[] = ['date', 'running', 'meditation', 'emotion', 'edit'];
  public dataSource;

  constructor(
    public dialog: MatDialog,
    public sportService: SportService,
    public dialogService: DialogService,
  ) {
    this.sportService.items.subscribe((items) => {
      if (items) this.dataSource = [...items];
    });
    
    this.dialogService.data.subscribe((data: SportItemModel) => {
      if (data) {
        if (data.id) {
          this.sportService.patchItem(data);
        } else this.sportService.addItem(data);
      };
    });
   }

  public addOrEditEntry(entry?: SportItemModel) {
    this.dialogService.data.next(null);
    this.dialogService.addEditItem('sport', entry);
  }

  public delete(entry: SportItemModel) {
    this.sportService.deleteItem(entry.id);
  }

}
