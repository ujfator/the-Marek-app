import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { School } from 'server/models';
import { DifficultyService } from 'src/app/common/services/api-calls/difficulty.service';
import { SchoolService } from 'src/app/common/services/api-calls/school.service';
import { AuthorizationQuery } from 'src/app/state-management/authorization/authorization.query';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditSchoolItemComponent implements OnInit {

	form: FormGroup;
	difficulties: string[];
	authors: string[];

  constructor(
		public dialogRef: MatDialogRef<AddEditSchoolItemComponent>,
		@Inject(MAT_DIALOG_DATA) public data: School,
		private authorizationQuery: AuthorizationQuery,
		private difficultyService: DifficultyService,
		private schoolService: SchoolService,
  	) {
		this.difficultyService.difficulties.subscribe((items)=>{
			if (items) this.difficulties = [...items];
		});
		this.authorizationQuery.users.subscribe((authors) => this.authors = authors);
 	}

	ngOnInit(): void {
		this.form = new FormGroup({
			date: new FormControl(this.data ? this.data.date : new Date()),
			subject: new FormControl(this.data ? this.data.subject : ''),
			difficulty: new FormControl(this.data ? this.data.difficulty : ''),
			typeOfTest: new FormControl(this.data ? this.data.typeOfTest : ''),
			author: new FormControl(this.data ? this.data.author : ''),
		});
 	}

	public onSubmit(): void {
		if (this.form.valid) {
			const newOrUpdatedItem =  {
				date: this.form.value.date,
				subject: this.form.value.subject,
				difficulty: this.form.value.lunch,
				typeOfTest: this.form.value.typeOfTest,
				id: this.data ? this.data.id : '',
				author: this.form.value.author ? this.form.value.author : '',
			};
			newOrUpdatedItem.id ? this.schoolService.patchItem(newOrUpdatedItem) : this.schoolService.addItem(newOrUpdatedItem);
			this.dialogRef.close();
      	}
	}
}
