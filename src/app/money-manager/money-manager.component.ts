import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-money-manager',
  templateUrl: './money-manager.component.html',
  styleUrls: ['./money-manager.component.scss']
})
export class MoneyManagerComponent {

   // Doughnut
   public doughnutChartLabels: Label[] = ['Saved car money', ' Car money to save'];
   public doughnutChartData: MultiDataSet = [
     [0, 100],
   ];
   public doughnutChartType: ChartType = 'doughnut';

   constructor() { }

   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
     console.log(event, active);
   }

   public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
     console.log(event, active);
   }
}
