import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  date: string,
  breakfast: string;
  lunch: string;
  dinner: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '2.4.2019', breakfast: 'hummus, bread, skyr - me', lunch: 'chicken curry & kuskus, beans - Robotron', dinner: 'hummus & ghirken, pork & veg - me'},
];

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  displayedColumns: string[] = ['date', 'breakfast', 'lunch', 'dinner'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }
}
