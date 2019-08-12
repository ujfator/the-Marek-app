import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';

import { MoneyItemModel, BudgetItemModel, WorkflowItemModel } from 'server/models';
import { AddEditItemComponent } from '../add-edit-item/add-edit-item.component';

@Injectable()
export class DialogService {

    public data: Subject<BudgetItemModel|MoneyItemModel|WorkflowItemModel> = new BehaviorSubject<BudgetItemModel|MoneyItemModel|WorkflowItemModel>(null);

    constructor(
        public dialog: MatDialog,
    ) {}

	public addEditItem(origin: string, item?: MoneyItemModel|BudgetItemModel|WorkflowItemModel) {
		const dialogRef = this.dialog.open(AddEditItemComponent, {
		  data: {
			item: item ? item : null,
			origin: origin,
		  },
		  width: '500px',
			});
        dialogRef.afterClosed().subscribe(result => {
            this.data.next(result);
            console.log('The dialog was closed', result ? result : 'by clicking on cancel');
        });
      }
      
}