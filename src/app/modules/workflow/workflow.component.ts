import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Workflow } from 'server/models';
import { WorkflowService } from '../../common/services/api-calls/workflow.service';
import { DifficultyService } from '../../common/services/api-calls/difficulty.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditWorkflowItemComponent } from './add-edit-workflow-item/add-edit-workflow-item.component';
import { AuthorizationQuery } from 'src/app/state-management/authorization/authorization.query';
import { MarekCommon } from 'src/app/common/components/common.component';
import { takeUntil } from 'rxjs/operators';

interface Columns {
	new: Workflow[];
	thisWeek: Workflow[];
	today: Workflow[];
	done: Workflow[];
}

@Component({
	selector: 'app-workflow',
	templateUrl: './workflow.component.html',
	styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent extends MarekCommon {
	workflowItems: Workflow[];
	columns: Columns = {
		new: [],
		thisWeek: [],
		today: [],
		done: [],
	};
	author: string;

	constructor(
		protected workflowService: WorkflowService,
		protected authorizationQuery: AuthorizationQuery,
		protected difficultyService: DifficultyService,
		public dialog: MatDialog,
	) {
		super();
		this.workflowService.items.pipe(takeUntil(this.destroyed)).subscribe((items) => {
			if (items) {
				this.workflowItems = items;
				this.createDataSource(this.author);
			}
		});
		this.authorizationQuery.selectedUser.pipe(takeUntil(this.destroyed)).subscribe((author) => {
			this.author = author;
			this.createDataSource(author);
		});
	}

	filler(item: Workflow) {
		switch (item.container) {
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

	createDataSource(author?: string): void {
		this.emptyColumns();
		this.workflowItems &&
			this.workflowItems.forEach((item) => {
				if (author) {
					if (item.author === author) this.filler(item);
				} else this.filler(item);
			});
	}

	changeContainerName(name: string): string {
		switch (name) {
			case 'cdk-drop-list-0':
				return 'new';
			case 'cdk-drop-list-1':
				return 'thisWeek';
			case 'cdk-drop-list-2':
				return 'today';
			case 'cdk-drop-list-3':
				return 'done';
		}
	}

	delete(id: string): void {
		this.workflowService.deleteItem(id);
	}

	drop(e: CdkDragDrop<any[]>): void {
		let newContainer: string;
		let movedItem: any;
		if (e.previousContainer === e.container) {
			moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
		} else {
			transferArrayItem(
				e.previousContainer.data,
				e.container.data,
				e.previousIndex,
				e.currentIndex,
			);
			newContainer = this.changeContainerName(e.container.id);
			e.container.data.forEach((element) => {
				if (newContainer && element['container'] !== newContainer) {
					movedItem = { ...element, container: newContainer };
					movedItem.container = newContainer;
					this.workflowService.patchItem(movedItem);
				}
			});
		}
	}

	addEditItem(item?: Workflow): void {
		const dialogRef = this.dialog.open(AddEditWorkflowItemComponent, {
			data: item,
			width: '500px',
		});
	}

	emptyColumns(): void {
		this.columns.new = [];
		this.columns.thisWeek = [];
		this.columns.today = [];
		this.columns.done = [];
	}
}
