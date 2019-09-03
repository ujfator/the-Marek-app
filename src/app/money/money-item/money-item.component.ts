import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import * as _ from 'lodash';

import { MoneyService } from 'src/app/common/services';
import { MoneyModel } from 'server/models';

@Component({
  selector: 'app-money-item',
  templateUrl: './money-item.component.html',
  styleUrls: ['./money-item.component.scss']
})
export class MoneyItemComponent {

  public id: string;
  public moneyItems: MoneyModel[];
  public currentItem: MoneyModel;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['To save', 'Savings'];
  public pieChartData: SingleDataSet = [0, 0];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor (
		public activeRoute: ActivatedRoute,
    public moneyService: MoneyService,
	) {
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
		this.moneyService.items.subscribe((items) => {
      if (items) {
        this.moneyItems = items;
        this.init();
      };
		});
		this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.init();
      }
    });
  }

  public init (): void {
    if (!_.isEmpty(this.moneyItems) && this.id) {
      this.currentItem = this.moneyItems.find((item) => item.id === this.id);
      this.pieChartData = [this.currentItem.price - this.currentItem.savings, this.currentItem.savings];
    } else if (!_.isEmpty(this.moneyItems) && !this.id) {
      this.currentItem = this.moneyItems[0];
      this.pieChartData = [this.currentItem.price - this.currentItem.savings, this.currentItem.savings];
    }
  }
}
