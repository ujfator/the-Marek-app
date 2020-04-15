import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditItemComponent implements OnInit {

	form: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<AddEditItemComponent>,
		@Inject(MAT_DIALOG_DATA) public data: {
			item: any, origin: string
		},
	) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(this.data.item ? this.data.item.name : ''),
			amount: new FormControl(),
			author: new FormControl(this.data.item ? this.data.item.author : ''),
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			const newOrUpdatedItem = {
				item: {
					name: this.form.value.name,
					amount: this.form.value.amount,
					nature: this.data.origin,
					author: this.form.value.author,
				},
				origin: 'money',
			}
			this.dialogRef.close(newOrUpdatedItem);
		}
	}
}
