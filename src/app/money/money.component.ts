import { Component } from '@angular/core';

import { MoneyModel, BudgetItemModel } from 'server/models';
import { MoneyService } from '../common/services/money.service';
import { DialogService } from '../common/services/dialog.service';
import { BudgetService } from '../common/services/budget.service';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent {

  public moneyItems: MoneyModel[];
  public expenses: BudgetItemModel[] = [];
  public savings: BudgetItemModel[] = [];
  public toSpend: BudgetItemModel[] = [];
  public loans: BudgetItemModel[] = [];
  
  constructor(
    public moneyService: MoneyService,
    public dialogService: DialogService,
    public budgetService: BudgetService,
  ) {
    this.moneyService.items.subscribe((items) => {
      if (items) this.moneyItems = [...items];
    });

    this.budgetService.items.subscribe((items) => {
      this.emptyColumns();
      if (items) {
        items.forEach(item => {
          switch(item.nature) {
            case 'expense':
              this.expenses.push(item);
              break;
            case 'savings':
              this.savings.push(item);
              break;
            case 'loan':
              this.loans.push(item);
              break;
            case 'toSpend':
              this.toSpend.push(item);
              break;
          }
        });
      };
    });

    this.dialogService.data.subscribe(async(data: any) => {
      if (data && data.origin === 'money') {
        const item = await {...data.item};
        this.dialogService.data.next(null);
        if (item.id) {
          this.budgetService.patchItem(item);
        } else this.budgetService.addItem(item);
      }   
    })
  }

  public accumulator(source: BudgetItemModel[]): number {
    return source.reduce((acc, item) => {
      acc = Math.round((acc + item.amount)*100) / 100;
      return acc;;
    }, 0)
  }

  public addBudgetItem(origin: string) {
    this.dialogService.addEditItem(origin);
  }

  public delete(id: string) {
    this.budgetService.deleteItem(id);
  }

  public emptyColumns (): void {
    this.expenses = [];
    this.savings = [];
    this.toSpend = [];
    this.loans = [];
   };
}
