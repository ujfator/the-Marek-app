import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';

import { Money, Budget, Workflow, Quality, Food, School } from 'server/models';
import { AddEditItemComponent } from '../add-edit-item/add-edit-item.component';
import { AddEditWorkflowItemComponent } from '../../workflow/add-edit-workflow-item/add-edit-workflow-item.component'
import { AddEditQualityItemComponent } from '../../quality/add-edit-quality-item/add-edit-item.component';
import { ItemToSave } from '../interfaces';
import { AddEditFoodItemComponent } from '../../food/add-edit-food-item/add-edit-item.component';
import { AddEditSchoolItemComponent } from 'src/app/school/add-edit-school-item/add-edit-item.component';

interface ComponentType<T = any> {
  new (...args: any[]): T;
}

@Injectable()
export class DialogService {

    public data: Subject<ItemToSave> = new BehaviorSubject<ItemToSave>(null);

    constructor(public dialog: MatDialog) {}

    public addEditItem(origin: string, item?: Money|Budget|Workflow|Quality|Food|School) {
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