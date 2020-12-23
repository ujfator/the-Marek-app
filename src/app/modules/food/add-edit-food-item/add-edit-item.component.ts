import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Food } from 'server/models';
import { FoodService } from 'src/app/common/services/api-calls/food.service';
import { AuthorizationQuery } from 'src/app/state-management/authorization/authorization.query';

@Component({
	selector: 'app-add-edit-item',
	templateUrl: './add-edit-item.component.html',
	styleUrls: ['./add-edit-item.component.scss'],
})
export class AddEditFoodItemComponent implements OnInit {
	form: FormGroup;
	authors: string[];

	constructor(
		public dialogRef: MatDialogRef<AddEditFoodItemComponent>,
		private authorizationQuery: AuthorizationQuery,
		private foodService: FoodService,
		@Inject(MAT_DIALOG_DATA) public data: Food,
	) {
		this.authorizationQuery.users.subscribe((authors) => (this.authors = authors));
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			date: new FormControl(this.data ? this.data.date : new Date()),
			firstFood: new FormControl(this.data ? this.data.firstFood : ''),
			lastFood: new FormControl(this.data ? this.data.lastFood : ''),
			author: new FormControl(this.data ? this.data.author : ''),
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			const newOrUpdatedItem = {
				date: this.form.value.date,
				firstFood: this.form.value.firstFood,
				lastFood: this.form.value.lastFood,
				id: this.data ? this.data.id : '',
				author: this.form.value.author ? this.form.value.author : '',
			};
			newOrUpdatedItem && newOrUpdatedItem.id
				? this.foodService.patchItem(newOrUpdatedItem)
				: this.foodService.addItem(newOrUpdatedItem);
			this.dialogRef.close();
		}
	}
}
