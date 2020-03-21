import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';

import { Money, Budget, Workflow, Quality, Food, School } from 'server/models';
import { AddEditItemComponent } from '../../add-edit-item/add-edit-item.component';
import { AddEditWorkflowItemComponent } from '../../../modules/workflow/add-edit-workflow-item/add-edit-workflow-item.component'
import { AddEditQualityItemComponent } from '../../../modules/quality/add-edit-quality-item/add-edit-item.component';
import { ItemToSave } from '../../interfaces';
import { AddEditFoodItemComponent } from '../../../modules/food/add-edit-food-item/add-edit-item.component';
import { AddEditSchoolItemComponent } from 'src/app/modules/school/add-edit-school-item/add-edit-item.component';

interface ComponentType<T = any> {
  	new (...args: any[]): T;
}

@Injectable({ providedIn: 'root' })
export class DialogService {

    data: Subject<ItemToSave> = new BehaviorSubject<ItemToSave>(null);

    constructor(
		public dialog: MatDialog
		) {}

    addEditItem(origin: string, item?: Money|Budget|Workflow|Quality|Food|School) {
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

    pickDialog(origin: string): ComponentType {
        switch (origin) {
			case 'workflow': return AddEditWorkflowItemComponent;
			case 'sport': return AddEditQualityItemComponent;
			case 'savings': return AddEditItemComponent;
			case 'toSpend': return AddEditItemComponent;
			case 'expense': return AddEditItemComponent;
			case 'loan': return AddEditItemComponent;
			case 'food': return AddEditFoodItemComponent;
			case 'school': return AddEditSchoolItemComponent;
        }
    }

}