import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Workflow } from 'server/models';
import { ItemToSave } from '../../common/interfaces';
import { WorkflowService } from '../../common/services/api-calls/workflow.service';
import { DialogService } from '../../common/services/api-calls/dialog.service';
import { DifficultyService } from '../../common/services/api-calls/difficulty.service';
import { MatDialog } from '@angular/material';
import { AddEditWorkflowItemComponent } from './add-edit-workflow-item/add-edit-workflow-item.component';
import { AuthorService } from 'src/app/common/services/local-services/author.service';

interface Columns {
	new: Workflow[],
	thisWeek: Workflow[],
	today: Workflow[],
	done: Workflow[]
}

@Component({
	selector: 'app-workflow',
	templateUrl: './workflow.component.html',
	styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit{

	workflowItems: Workflow[];
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
		public dialog: MatDialog,
	) {
		this.workflowService.items.subscribe((items) => {
			if (items) this.workflowItems = items;
			if (!localStorage.getItem('author')) {
				this.createDataSource();
			} else this.createDataSource(localStorage.getItem('author'));
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

	filler(item: Workflow) {
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

	createDataSource (author?: string): void {
		this.emptyColumns();
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

	drop(e: CdkDragDrop<string[]>): void {
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

	addEditItem(item?: Workflow): void {
		const dialogRef = this.dialog.open(AddEditWorkflowItemComponent, {
			data: {
			  item: item ? item : null,
			  origin: origin,
			  authors: ['Terezka', 'Marek'],
			},
			width: '500px',
		});
		dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result ? result : 'by clicking on cancel');
			if (result.id) {
				this.workflowService.patchItem(result);
			} else this.workflowService.addItem(result);
        });
	}

	emptyColumns (): void {
		this.columns.new = [];
		this.columns.thisWeek = [];
		this.columns.today = [];
		this.columns.done = [];
	};
}
