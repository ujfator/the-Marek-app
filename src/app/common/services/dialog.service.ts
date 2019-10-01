import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';

import { MoneyModel, BudgetItemModel, WorkflowModel, SportItemModel, FoodModel } from 'server/models';
import { AddEditItemComponent } from '../add-edit-item/add-edit-item.component';
import { AddEditWorkflowItemComponent } from '../../workflow/add-edit-workflow-item/add-edit-workflow-item.component'
import { AddEditSportItemComponent } from '../../sport/add-edit-sport-item/add-edit-item.component';
import { ItemToSave } from '../interfaces';
import { AddEditFoodItemComponent } from '../../food/add-edit-food-item/add-edit-item.component';

interface ComponentType<T = any> {
  new (...args: any[]): T;
}

@Injectable()
export class DialogService {

    public data: Subject<ItemToSave> = new BehaviorSubject<ItemToSave>(null);

    constructor(public dialog: MatDialog) {}

    public addEditItem(origin: string, item?: MoneyModel|BudgetItemModel|WorkflowModel|SportItemModel|FoodModel) {
        const dialogRef = this.dialog.open(this.pickDialog(origin), {
          data: {
            item: item ? item : null,
            origin: origin,
            authors: ['Terezka', 'Marek'],
          },
          width: '500px',
      });
        dialogRef.afterClosed().subscribe(result => {
            this.data.next(result);
            console.log('The dialog was closed', result ? result : 'by clicking on cancel');
        });
    }

    public pickDialog(origin: string): ComponentType {
        switch (origin) {
          case 'workflow': return AddEditWorkflowItemComponent;
          case 'sport': return AddEditSportItemComponent;
          case 'asset': return AddEditItemComponent;
          case 'expense': return AddEditItemComponent;
          case 'loan': return AddEditItemComponent;
          case 'food': return AddEditFoodItemComponent;
        }
    }
      
}