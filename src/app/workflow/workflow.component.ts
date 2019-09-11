import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { WorkflowModel } from 'server/models';
import { DialogService, WorkflowService, AuthorService, DifficultyService } from '../common/services';
import { ItemToSave } from '../common/interfaces';

interface Columns {
  new: WorkflowModel[],
  approved: WorkflowModel[],
  commited: WorkflowModel[],
  done: WorkflowModel[]
}

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent {

  public workflowItems: WorkflowModel[];
  public columns: Columns = {
    new: [],
    approved: [],
    commited: [],
    done: []
  };

  constructor(
    public workflowService: WorkflowService,
    public dialogService: DialogService,
    public authorService: AuthorService,
    public difficultyService: DifficultyService,
  ) {
    this.workflowService.items.subscribe(async (items) => {
      if (items) this.workflowItems = await items;
      if (!localStorage.getItem('author')) {
        this.createDataSource();
      } else this.createDataSource(localStorage.getItem('author'))
    });

    this.dialogService.data.subscribe((data: any) => {
      if (data) {
        if (data.origin === 'workflow') {
          const item = {...data.item};
          if (item.id) {
            this.workflowService.patchItem(item);
          } else this.workflowService.addItem(item);
          if (item['difficulty']) this.difficultyService.addDifficulty(item['difficulty']);
        }
      }
    });

    this.authorService.author.subscribe((author) => {
      if (author && author !== 'Oba') {
        this.createDataSource(author);
      } else if (author === 'Oba') this.createDataSource()
    });
  }

  public filler(item: WorkflowModel) {
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
      if (author && author !== 'Oba') {
        if (item.author === author) this.filler(item);
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
      });
    }

  }

  public addEditItem(item?: WorkflowModel) {
    this.dialogService.addEditItem('workflow', item);
    this.dialogService.data.next(null);
  }

  public emptyColumns (): void {
   this.columns.new = [];
   this.columns.approved = [];
   this.columns.commited = [];
   this.columns.done = [];
  };
}
