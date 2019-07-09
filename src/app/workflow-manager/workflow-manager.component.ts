import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WorkflowManagerService } from '../common/services/workflow-manager.service';
import { WorkflowItemModel } from 'server/models';
import { AddEditWorkflowItemComponent } from './add-edit-workflow-item/add-edit-workflow-item.component';

@Component({
  selector: 'app-workflow-manager',
  templateUrl: './workflow-manager.component.html',
  styleUrls: ['./workflow-manager.component.scss']
})
export class WorkflowManagerComponent {

  public workflowItems: WorkflowItemModel[];

  constructor(
    public workflowManagerService: WorkflowManagerService,
    public dialog: MatDialog,
  ) {
    this.workflowManagerService.items.subscribe((items) => {
      this.workflowItems = items;
    })
   }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  public addEditItem(entry) {
    console.log(entry);
    const dialogRef = this.dialog.open(AddEditWorkflowItemComponent, {
			data: entry,
			width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
		});
  }
}
