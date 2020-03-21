import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DifficultyService } from '../../../common/services/api-calls/difficulty.service';

@Component({
	selector: 'app-add-edit-workflow-item',
	templateUrl: './add-edit-workflow-item.component.html',
	styleUrls: ['./add-edit-workflow-item.component.scss']
})
export class AddEditWorkflowItemComponent implements OnInit {

	public form: FormGroup;
	public difficulties: string[] = [];

	constructor(
		public dialogRef: MatDialogRef<AddEditWorkflowItemComponent>,
		public difficultyService: DifficultyService,
		@Inject(MAT_DIALOG_DATA) public data: {
			item: any, authors: string[],
		},
	) {
		this.difficultyService.difficulties.subscribe((items)=>{
			if (items) this.difficulties = [...items];
		});
	}

	public ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(this.data.item ? this.data.item.name : ''),
			content: new FormControl(this.data.item ? this.data.item.content : ''),
			author: new FormControl(this.data.item ? this.data.item.author : ''),
			difficulty: new FormControl(this.data.item ? this.data.item.difficulty : ''),
		});
	}

	public onSubmit(): void {
		if (this.form.valid) {
			const newOrUpdatedItem =  {
				name: this.form.value.name,
				author: this.form.value.author,
				content: this.form.value.content,
				container: (this.data.item && this.data.item.container) ? this.data.item.container : 'new',
				id: this.data.item && this.data.item.id,
				difficulty: this.form.value.difficulty,
      		}
			this.dialogRef.close(newOrUpdatedItem);
		}
  	}
}
