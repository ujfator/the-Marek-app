import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WorkflowManagerService } from '../common/services/workflow-manager.service';
import { WorkflowItemModel } from 'server/models';
import { AddEditItemComponent } from '../common/add-edit-item/add-edit-item.component';

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
    public workflowService: WorkflowManagerService,
    public dialog: MatDialog,
  ) {
    this.workflowService.items.subscribe(async (items) => {
      if (this.columns) this.emptyColumns();
      if (items) this.workflowItems = await items;
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
    })
  }

  public changeContainerName (name: string): string {
    switch (name) {
      case 'cdk-drop-list-0': return 'new';
			case 'cdk-drop-list-1': return 'approved';
			case 'cdk-drop-list-2': return 'commited';
			case 'cdk-drop-list-3': return 'done';
    } 
  }

  public delete (id: string): void {
    this.workflowService.deleteItem(id);
  }

  public drop(e: CdkDragDrop<string[]>) {
    let newContainer: string;
    let movedItem: any;
    if (e.previousContainer === e.container) {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
    } else {
      transferArrayItem(e.previousContainer.data, e.container.data, e.previousIndex, e.currentIndex);
      newContainer = this.changeContainerName(e.container.id);
      e.container.data.forEach((element) => {
        if (element['container'] === newContainer) {} else {
          movedItem = element;
          movedItem.container = newContainer;
          this.workflowService.patchItem(movedItem);
        }
      })
    }

  }

  public addEditItem(item?: WorkflowItemModel) {
    const dialogRef = this.dialog.open(AddEditItemComponent, {
			data: {
        item: item ? item : '',
        origin: 'workflow',
      },
			width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
      result && (result.id ? this.workflowService.patchItem(result) : this.workflowService.addItem(result));
			console.log('The dialog was closed', result ? result : 'by clicking on cancel');
		});
  }

  public emptyColumns (): void {
   this.columns.new = [];
   this.columns.approved = [];
   this.columns.commited = [];
   this.columns.done = [];
  };
}
