import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DifficultyService } from '../../../common/services/api-calls/difficulty.service';
import { WorkflowService } from 'src/app/common/services/api-calls/workflow.service';
import { AuthorizationQuery } from 'src/app/state-management/authorization/authorization.query';

@Component({
	selector: 'app-add-edit-workflow-item',
	templateUrl: './add-edit-workflow-item.component.html',
	styleUrls: ['./add-edit-workflow-item.component.scss'],
})
export class AddEditWorkflowItemComponent implements OnInit {
	form: FormGroup;
	difficulties: string[] = [];
	authors: string[];

	constructor(
		public dialogRef: MatDialogRef<AddEditWorkflowItemComponent>,
		public difficultyService: DifficultyService,
		private workflowService: WorkflowService,
		private authorizationQuery: AuthorizationQuery,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
		this.difficultyService.difficulties.subscribe((items) => {
			if (items) this.difficulties = [...items];
		});
		this.authorizationQuery.users.subscribe((users) => (this.authors = users));
	}

	public ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(this.data ? this.data.name : ''),
			content: new FormControl(this.data ? this.data.content : ''),
			author: new FormControl(this.data ? this.data.author : ''),
			difficulty: new FormControl(this.data ? this.data.difficulty : ''),
		});
	}

	public onSubmit(): void {
		if (this.form.valid) {
			const newOrUpdatedItem = {
				name: this.form.value.name,
				author: this.form.value.author,
				content: this.form.value.content,
				container: this.data && this.data.container ? this.data.container : 'new',
				id: this.data && this.data.id,
				difficulty: this.form.value.difficulty,
			};
			newOrUpdatedItem.id
				? this.workflowService.patchItem(newOrUpdatedItem)
				: this.workflowService.addItem(newOrUpdatedItem);
			this.dialogRef.close();
		}
	}
}
