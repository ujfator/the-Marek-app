import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';

import { MoneyModel, BudgetItemModel, WorkflowModel, SportItemModel } from 'server/models';
import { AddEditItemComponent } from '../add-edit-item/add-edit-item.component';
import { AddEditWorkflowItemComponent } from '../../workflow/add-edit-workflow-item/add-edit-workflow-item.component'
import { AddEditSportItemComponent } from '../../sport/add-edit-sport-item/add-edit-item.component';

@Injectable()
export class DialogService {

    public data: Subject<
    BudgetItemModel|MoneyModel|WorkflowModel|SportItemModel> = new BehaviorSubject<
    BudgetItemModel|MoneyModel|WorkflowModel|SportItemModel>(null);

    constructor(
        public dialog: MatDialog,
    ) {}

	public addEditItem(origin: string, item?: MoneyModel|BudgetItemModel|WorkflowModel|SportItemModel) {
    console.log(origin, item);
		const dialogRef = this.dialog.open(this.pickDialog(origin), {
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

  public pickDialog(origin: string) {
    switch (origin) {
      case 'workflow': return AddEditWorkflowItemComponent;
      case 'sport': return AddEditSportItemComponent;
    }
  }
      
}