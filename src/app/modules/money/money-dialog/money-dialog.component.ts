import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-money-dialog',
  templateUrl: './money-dialog.component.html',
  styleUrls: ['./money-dialog.component.scss']
})
export class MoneyDialogComponent implements OnInit {

	form: FormGroup;
	natures = ['expenses', 'savings', 'loans', 'properties'];

	constructor(
		public dialogRef: MatDialogRef<MoneyDialogComponent>,
	) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(),
			amount: new FormControl(),
			nature: new FormControl(),
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			const newOrUpdatedItem = {
				name: this.form.value.name,
				amount: this.form.value.amount,
				nature: this.form.value.nature,
				author: localStorage.getItem('author'),
			}
			this.dialogRef.close(newOrUpdatedItem);
		}
	}
}
