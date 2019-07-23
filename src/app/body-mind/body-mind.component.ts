import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddEditDialogComponent } from '../common/add-edit-dialog/add-edit-dialog.component';

export interface BodyMindEntryInterface {
  date: Date,
  running: string;
  meditation: string;
  emotion: string;
}

const ELEMENT_DATA: BodyMindEntryInterface[] = [
  {
    date: new Date(),
    running: '10:01, 1.31 km',
    meditation: '',
    emotion: 'anger'
  },
];

@Component({
  selector: 'app-body-mind',
  templateUrl: './body-mind.component.html',
  styleUrls: ['./body-mind.component.scss']
})

export class BodyMindComponent {

  public displayedColumns: string[] = ['date', 'running', 'meditation', 'emotion', 'edit'];
  public dataSource = ELEMENT_DATA;
  public keys: BodyMindEntryInterface = {
    date: new Date,
    running: '',
    meditation: '',
    emotion: ''
  }

  constructor(
    public dialog: MatDialog,
  ) { }

  public addOrEditEntry(entry: BodyMindEntryInterface) {
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      data: entry ? entry : this.keys,
			width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
		});
  }

}
