import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddEditFoodEntryComponent } from '../food/add-edit-food-entry/add-edit-food-entry.component';

export interface FoodEntry {
  date: Date,
  breakfast: string;
  lunch: string;
  dinner: string;
}

const ELEMENT_DATA: FoodEntry[] = [
  {date: new Date(), breakfast: 'hummus, bread, skyr - me', lunch: 'chicken curry & kuskus, beans - Robotron', dinner: 'hummus & ghirken, pork & veg - me'},
];

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  displayedColumns: string[] = ['date', 'breakfast', 'lunch', 'dinner', 'edit'];
  dataSource = ELEMENT_DATA;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public editEntry(entry: FoodEntry) {
    console.log(entry);
    const dialogRef = this.dialog.open(AddEditFoodEntryComponent, {
			data: entry,
			width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
		});
  }
}
