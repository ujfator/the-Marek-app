import { Component } from '@angular/core';

import { MoneyModel } from 'server/models';
import { MoneyService, DialogService } from '../common/services';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent {

  public moneyItems: MoneyModel[];
  public navigationItems;
  
  constructor(
    public moneyService: MoneyService,
    public dialogService: DialogService,
  ) {
    this.moneyService.items.subscribe(async (items) => {
      if (items) {
        this.moneyItems = await items;
        this._buildItems(items);
      }
    });
    this.dialogService.data.subscribe((data: MoneyModel) => {
      if (data) {
        if (data.id) {
          this.moneyService.patchItem(data);
        } else this.moneyService.addItem(data);
      }
    })
  }

  public addEditItem(item?: MoneyModel) {
    this.dialogService.addEditItem('money', item);
  }

  public deleteItem(id: string) {
    this.moneyService.deleteItem(id);
  }

  private async _buildItems (items) {
    this.navigationItems = items.map((item: MoneyModel) => {
      const obj = { route: `./moneyItem/${item.id}`, name: item.name, id: item.id, data: { item } };
      return obj;
		});
  }
}
