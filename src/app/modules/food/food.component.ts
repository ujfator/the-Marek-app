import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodService } from '../../common/services/api-calls/food.service';
import { Food } from 'server/models';
import { AddEditFoodItemComponent } from './add-edit-food-item/add-edit-item.component';
import { AuthorizationQuery } from 'src/app/state-management/authorization/authorization.query';

@Component({
	selector: 'app-food',
	templateUrl: './food.component.html',
	styleUrls: ['./food.component.scss'],
})
export class FoodComponent {
	displayedColumns: string[] = [
		'date',
		'firstFood',
		'lastFood',
		'author',
		'edit',
	];
	foodItems: Food[] = [];
	allItems: Food[] = [];

	constructor(
		public dialog: MatDialog,
		private foodService: FoodService,
		private authorizationQuery: AuthorizationQuery,
	) {
		this.foodService.items.subscribe(async (items) => {
			if (items) {
				this.allItems = await [...items];
				if (localStorage.getItem('author')) {
					this.createDataSource(localStorage.getItem('author'));
				} else this.foodItems = [...items];
			}
		});

		this.authorizationQuery.selectedUser.subscribe((author) => {
			if (author && author !== 'Oba') {
				this.createDataSource(author);
			} else if (author === 'Oba') this.foodItems = [...this.allItems];
		});
	}

	addOrEditEntry(item: Food) {
		const dialogRef = this.dialog.open(AddEditFoodItemComponent, {
			data: item,
			width: '500px',
		});
	}

	createDataSource(author?: string) {
		this.foodItems = [];
		this.allItems &&
			this.allItems.forEach((element) => {
				if (element.author === author) this.foodItems.push(element);
			});
	}

	delete(entry: Food) {
		this.foodService.deleteItem(entry.id);
	}
}
