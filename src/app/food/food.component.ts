import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  main: string;
  side: string;
  cook: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {main: 'chicken curry', side: 'kuskus, beans', cook: 'Robotron canteen'},
];

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  displayedColumns: string[] = ['main', 'side', 'cook'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
