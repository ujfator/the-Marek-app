import { Component } from '@angular/core';

import { MoneyModel, BudgetItemModel } from 'server/models';
import { MoneyService, DialogService, BudgetService } from '../common/services';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent {

  public moneyItems: MoneyModel[];
  public budgetItems: BudgetItemModel[];
  
  constructor(
    public moneyService: MoneyService,
    public dialogService: DialogService,
    public budgetService: BudgetService,
  ) {
    this.moneyService.items.subscribe((items) => {
      if (items) this.moneyItems = [...items];
    });

    this.budgetService.items.subscribe(async (items) => {
      if (items) {
        this.budgetItems = await [...items];
        this.allExpenses();
      };
    });

    this.dialogService.data.subscribe((data: any) => {
      if (data) {
        if (data.savings) {
          if (data.id) {
            this.moneyService.patchItem(data);
          } else this.moneyService.addItem(data);
        } else if (data.amount) {
          if (data.id) {
            this.budgetService.patchItem(data);
          } else this.budgetService.addItem(data);
        }
      }
    })
  }

  public allExpenses(): number {
    return this.budgetItems.reduce((acc, item) => {
      acc = acc + item.amount;
      return acc;
    }, 0)
  }

  public addBudgetItem(item?: BudgetItemModel) {
    this.dialogService.addEditItem('budget', item);
  }

  public delete(id: string) {
    this.budgetService.deleteItem(id);
  }
}
