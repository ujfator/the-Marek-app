import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


import { WorkflowItemModel } from 'server/models';
import { DialogService, WorkflowManagerService, AuthorService } from '../common/services';

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

  public selectedAuthor: string = '';
  public workflowItems: WorkflowItemModel[];
  public columns: columns = {
    new: [],
    approved: [],
    commited: [],
    done: []
  };

  constructor(
    public workflowService: WorkflowManagerService,
    public dialogService: DialogService,
    public authorService: AuthorService,
  ) {
    this.workflowService.items.subscribe(async (items) => {
      if (items) this.workflowItems = await items;
      this.createDataSource();
    });
    this.dialogService.data.subscribe((data: WorkflowItemModel) => {
      if (data) {
        if (data.id) {
          this.workflowService.patchItem(data);
        } else this.workflowService.addItem(data);
      }
    })
    this.authorService.author.subscribe(async (author) => {
      this.selectedAuthor = await author;
      this.createDataSource(author);
    })
  }

  public filler(item: WorkflowItemModel) {
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
  }

  public async createDataSource (author?: string) {
    if (this.columns) await this.emptyColumns();
    this.workflowItems && this.workflowItems.forEach(item => {
      if (author) {
        if (item.author === author) {
          this.filler(item);
        }
      } else this.filler(item);
    });
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
    this.dialogService.addEditItem('workflow', item);
  }

  public emptyColumns (): void {
   this.columns.new = [];
   this.columns.approved = [];
   this.columns.commited = [];
   this.columns.done = [];
  };
}
