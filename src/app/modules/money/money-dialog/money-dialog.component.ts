import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BudgetService } from 'src/app/common/services/api-calls/budget.service';

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
		private budgetService: BudgetService,
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
			const newItem = {
				name: this.form.value.name,
				amount: this.form.value.amount,
				nature: this.form.value.nature,
				author: localStorage.getItem('author'),
			};
			this.budgetService.addItem(newItem);
		}
	}
}
