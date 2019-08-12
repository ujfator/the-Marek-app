import { Component } from '@angular/core';
import { MoneyItemModel } from 'server/models';
import { MatDialog } from '@angular/material';
import { AddEditItemComponent } from '../common/add-edit-item/add-edit-item.component';
import { MoneyManagerService, DialogService } from '../common/services';

@Component({
  selector: 'app-money-manager',
  templateUrl: './money-manager.component.html',
  styleUrls: ['./money-manager.component.scss']
})
export class MoneyManagerComponent {

  public moneyItems: MoneyItemModel[];
  public navigationItems;
  
  constructor(
    public moneyService: MoneyManagerService,
    public dialogService: DialogService,
  ) {
    this.moneyService.items.subscribe(async (items) => {
      if (items) {
        this.moneyItems = await items;
        this._buildItems(items);
      }
    });
    this.dialogService.data.subscribe((data: MoneyItemModel) => {
      if (data) {
        if (data.id) {
          this.moneyService.patchItem(data);
        } else this.moneyService.addItem(data);
      }
    })
  }

  public addEditItem(item?: MoneyItemModel) {
    this.dialogService.addEditItem('money', item);
  }

  public deleteItem(id: string) {
    this.moneyService.deleteItem(id);
  }

  private async _buildItems (items) {
    this.navigationItems = items.map((item: MoneyItemModel) => {
      const obj = { route: `./moneyItem/${item.id}`, name: item.name, id: item.id, data: { item } };
      return obj;
		});
  }
}
