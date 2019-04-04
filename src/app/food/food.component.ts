import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddEditDialogComponent } from '../common/add-edit-dialog/add-edit-dialog.component';

interface FoodEntryInterface {
  date: Date,
  breakfast: string;
  lunch: string;
  dinner: string;
}

const ELEMENT_DATA: FoodEntryInterface[] = [
  {
    date: new Date(),
    breakfast: 'hummus, bread, skyr - me',
    lunch: 'chicken curry & kuskus, beans - Robotron',
    dinner: 'hummus & ghirken, pork & veg - me'
  },
];

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {

  public displayedColumns: string[] = ['date', 'breakfast', 'lunch', 'dinner', 'edit'];
  public dataSource = ELEMENT_DATA;
  public keys: FoodEntryInterface = {
    date: new Date,
    breakfast: '',
    lunch: '',
    dinner: ''
  }

  constructor(
    public dialog: MatDialog,
  ) { }

  public addOrEditEntry(entry: FoodEntryInterface) {
    console.log(entry);
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
			data: entry ? entry : this.keys,
			width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
		});
  }
}
