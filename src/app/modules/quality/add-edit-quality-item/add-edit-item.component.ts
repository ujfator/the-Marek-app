import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Quality } from 'server/models';
import { QualityService } from 'src/app/common/services/api-calls/quality.service';
import { AuthorizationQuery } from 'src/app/state-management/authorization/authorization.query';

@Component({
	selector: 'app-add-edit-item',
	templateUrl: './add-edit-item.component.html',
	styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditQualityItemComponent implements OnInit {

	form: FormGroup;
	authors: string[];

	constructor(
		public dialogRef: MatDialogRef<AddEditQualityItemComponent>,
		private authorizationQuery: AuthorizationQuery,
		private qualityService: QualityService,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: Quality,
	) {
		this.authorizationQuery.users.subscribe((authors) => this.authors = authors);
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			date: new FormControl(this.data ? this.data.date : new Date()),
			dayQuality: new FormControl(this.data ? this.data.dayQuality : null),
			wakeUp: new FormControl(this.data ? this.data.wakeUp : ''),
			goToBed: new FormControl(this.data ? this.data.goToBed : ''),
			sleepTime: new FormControl(this.data ? this.data.sleepTime : ''),
			excercise: new FormControl(this.data ? this.data.excercise : ''),
			deepWorkTime: new FormControl(this.data ? this.data.deepWorkTime : ''),
			meaningfulActivity: new FormControl(this.data ? this.data.meaningfulActivity : ''),
			author: new FormControl(this.data ? this.data.author : ''),
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			const newOrUpdatedItem =  {
				date: this.form.value.date,
				dayQuality: this.form.value.dayQuality,
				wakeUp: this.form.value.wakeUp,
				goToBed: this.form.value.goToBed,
				id: this.data ? this.data.id : '',
				sleepTime: this.form.value.sleepTime,
				excercise: this.form.value.excercise,
				meaningfulActivity: this.form.value.meaningfulActivity,
				deepWorkTime: this.form.value.deepWorkTime,
				author: this.form.value.author ? this.form.value.author : '',
      		};
			newOrUpdatedItem.id ? this.qualityService.patchItem(newOrUpdatedItem) : this.qualityService.addItem(newOrUpdatedItem);
		}
  	}
}
