import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Food } from 'server/models';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditFoodItemComponent implements OnInit {

	form: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<AddEditFoodItemComponent>,
		@Inject(MAT_DIALOG_DATA) public data: {
		item: Food, origin: string, authors: string[],
		},
	) {}

	ngOnInit(): void {
		this.form = new FormGroup({
			date: new FormControl(this.data.item ? this.data.item.date : new Date()),
			breakfast: new FormControl(this.data.item ? this.data.item.breakfast : ''),
			lunch: new FormControl(this.data.item ? this.data.item.lunch : ''),
			dinner: new FormControl(this.data.item ? this.data.item.dinner : ''),
			junkFood: new FormControl(this.data.item ? this.data.item.junkFood : ''),
			author: new FormControl(this.data.item ? this.data.item.author : ''),
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			const newOrUpdatedItem =  {
				item: {
				date: this.form.value.date,
				breakfast: this.form.value.breakfast,
				lunch: this.form.value.lunch,
				dinner: this.form.value.dinner,
				id: this.data.item ? this.data.item.id : '',
				junkFood: this.form.value.junkFood,
				author: this.form.value.author ? this.form.value.author : '',
				},
				origin: this.data.origin,
			}
			this.dialogRef.close(newOrUpdatedItem);
		}
	}
}
