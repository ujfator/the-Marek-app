import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WorkflowManagerService } from '../common/services/workflow-manager.service';
import { WorkflowItemModel } from 'server/models';
import { AddEditWorkflowItemComponent } from './add-edit-workflow-item/add-edit-workflow-item.component';

interface columns {
  new: WorkflowItemModel[],
  approved: WorkflowItemModel[],
  commited: WorkflowItemModel[],
  done: WorkflowItemModel[]
}

@Component({
  selector: 'app-workflow-manager',
  templateUrl: './workflow-manager.component.html',
  styleUrls: ['./workflow-manager.component.scss']
})
export class WorkflowManagerComponent {

  public workflowItems: WorkflowItemModel[];
  public columns: columns = {
    new: [],
    approved: [],
    commited: [],
    done: []
  };

  constructor(
    public workflowManagerService: WorkflowManagerService,
    public dialog: MatDialog,
  ) {
    this.workflowManagerService.items.subscribe((items) => {
      if (items) this.workflowItems = items;
      this.workflowItems && this.workflowItems.forEach(item => {
        switch(item.container) {
          case 'new':
            this.columns.new.push(item);
            break;
          case 'approved':
            this.columns.approved.push(item);
            break;
          case 'commited':
            this.columns.commited.push(item);
            break;
          case 'done':
            this.columns.done.push(item);
            break;
        }
      });
      console.log(this.workflowItems, this.columns);
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
    const dialogRef = this.dialog.open(AddEditWorkflowItemComponent, {
			data: entry,
			width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
		});
  }
}
