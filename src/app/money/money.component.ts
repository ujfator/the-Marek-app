import { Component } from '@angular/core';

import { MoneyModel, BudgetItemModel } from 'server/models';
import { MoneyService, DialogService, BudgetService } from '../common/services';
import { ItemToSave } from '../common/interfaces';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent {

  public moneyItems: MoneyModel[];
  public expenses: BudgetItemModel[] = [];
  public assets: BudgetItemModel[] = [];
  public loans: BudgetItemModel[] = [];
  
  constructor(
    public moneyService: MoneyService,
    public dialogService: DialogService,
    public budgetService: BudgetService,
  ) {
    this.moneyService.items.subscribe((items) => {
      if (items) this.moneyItems = [...items];
    });

    this.budgetService.items.subscribe(async(items) => {
      await this.emptyColumns();
      if (items) {
        items.forEach(item => {
          switch(item.nature) {
            case 'expense':
              this.expenses.push(item);
              break;
            case 'asset':
              this.assets.push(item);
              break;
            case 'loan':
              this.loans.push(item);
              break;
          }
        });
      };
    });

    this.dialogService.data.subscribe((data: any) => {
      if (data && data.origin === 'money') {
        const item = {...data.item};
        if (item.id) {
          this.budgetService.patchItem(item);
        } else this.budgetService.addItem(item);
      }   
    })
  }

  public accumulator(source: BudgetItemModel[]): number {
    return source.reduce((acc, item) => {
      acc = acc + item.amount;
      return acc;
    }, 0)
  }

  public addBudgetItem(origin: string) {
    this.dialogService.addEditItem(origin);
    this.dialogService.data.next(null);
  }

  public delete(id: string) {
    this.budgetService.deleteItem(id);
  }

  public emptyColumns (): void {
    this.expenses = [];
    this.assets = [];
    this.loans = [];
   };
}
