import { Component } from '@angular/core';
import { MoneyItemModel } from 'server/models';
import { MatDialog } from '@angular/material';
import { AddEditItemComponent } from '../common/add-edit-item/add-edit-item.component';
import { MoneyManagerService } from '../common/services';

@Component({
  selector: 'app-money-manager',
  templateUrl: './money-manager.component.html',
  styleUrls: ['./money-manager.component.scss']
})
export class MoneyManagerComponent {

  public moneyItems: MoneyItemModel[];
  public navigationItems;
  
  constructor(
    public dialog: MatDialog,
    public moneyService: MoneyManagerService,
  ) {
    this.moneyService.items.subscribe(async (items) => {
      if (items) {
        this.moneyItems = await items;
        this._buildItems(items);
      }
    });
  }

  public addEditItem(item?: MoneyItemModel) {
    const dialogRef = this.dialog.open(AddEditItemComponent, {
      data: {
        item:item ? item : '',
        origin: 'money'
      },
      width: '500px',
		});
		dialogRef.afterClosed().subscribe(result => {
      result && (result.id ? this.moneyService.patchItem(result) : this.moneyService.addItem(result));
			console.log('The dialog was closed', result ? result : 'by clicking on cancel');
		});
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
