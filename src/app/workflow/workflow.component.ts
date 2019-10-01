import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { WorkflowModel } from 'server/models';
import { ItemToSave } from '../common/interfaces';
import { WorkflowService } from '../common/services/workflow.service';
import { DialogService } from '../common/services/dialog.service';
import { AuthorService } from '../common/services/author.service';
import { DifficultyService } from '../common/services/difficulty.service';

interface Columns {
  new: WorkflowModel[],
  thisWeek: WorkflowModel[],
  today: WorkflowModel[],
  done: WorkflowModel[]
}

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit{

  workflowItems: WorkflowModel[];
  columns: Columns = {
    new: [],
    thisWeek: [],
    today: [],
    done: []
  };

  constructor(
    protected workflowService: WorkflowService,
    protected dialogService: DialogService,
    protected authorService: AuthorService,
    protected difficultyService: DifficultyService,
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

  ngOnInit(): void {
    if (!localStorage.getItem('author')) {
      this.createDataSource();
    } else this.createDataSource(localStorage.getItem('author'))
  }

  filler(item: WorkflowModel) {
    switch(item.container) {
      case 'new':
        this.columns.new.push(item);
        break;
      case 'thisWeek':
        this.columns.thisWeek.push(item);
        break;
      case 'today':
        this.columns.today.push(item);
        break;
      case 'done':
        this.columns.done.push(item);
        break;
    }
  }

  async createDataSource (author?: string) {
    await this.emptyColumns();
    this.workflowItems && this.workflowItems.forEach(item => {
      if (author && author !== 'Oba') {
        if (item.author === author) this.filler(item);
      } else this.filler(item);
    });
  }

  changeContainerName (name: string): string {
    switch (name) {
      case 'cdk-drop-list-0': return 'new';
			case 'cdk-drop-list-1': return 'thisWeek';
			case 'cdk-drop-list-2': return 'today';
			case 'cdk-drop-list-3': return 'done';
    } 
  }

  delete (id: string): void {
    this.workflowService.deleteItem(id);
  }

  drop(e: CdkDragDrop<string[]>) {
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

  addEditItem(item?: WorkflowModel) {
    this.dialogService.addEditItem('workflow', item);
    this.dialogService.data.next(null);
  }

  emptyColumns (): void {
    this.columns.new = [];
    this.columns.thisWeek = [];
    this.columns.today = [];
    this.columns.done = [];
  };
}
