import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { FoodService } from '../../common/services/api-calls/food.service';
import { DialogService } from '../../common/services/api-calls/dialog.service';
import { Food } from 'server/models';
import { AuthorService } from 'src/app/common/services/local-services/author.service';


@Component({
	selector: 'app-food',
	templateUrl: './food.component.html',
	styleUrls: ['./food.component.scss']
})

export class FoodComponent {

	displayedColumns: string[] = ['date', 'breakfast', 'lunch', 'dinner', 'junkFood', 'author', 'edit'];
	foodItems: Food[] = [];
	allItems: Food[] = [];

	constructor(
		public dialog: MatDialog,
		private foodService: FoodService,
		private dialogService: DialogService,
		private authorService: AuthorService,
	) {
		this.foodService.items.subscribe(async (items) => {
			if (items) {
				this.allItems = await [...items];
				if (localStorage.getItem('author')) {
					this.createDataSource(localStorage.getItem('author'))
				} else this.foodItems = [...items];
			}
		});

		this.dialogService.data.subscribe((data: any) => {
			if (data && data.origin === 'food') {
				const item = {...data.item};
				this.dialogService.data.next(null);
				if (item.id) {
					this.foodService.patchItem(item);
				} else this.foodService.addItem(item);
			};
		});

		this.authorService.author.subscribe((author) => {
			if (author && author !== 'Oba') {
				this.createDataSource(author);
			} else if (author === 'Oba') this.foodItems = [...this.allItems];
		});
  	}

	addOrEditEntry(entry?: Food) {
		this.dialogService.data.next(null);
		this.dialogService.addEditItem('food', entry);
	}

	createDataSource (author?: string) {
		this.foodItems = [];
		this.allItems && this.allItems.forEach(element => {
			if (element.author === author) this.foodItems.push(element);
		});
	}

	delete(entry: Food) {
		this.foodService.deleteItem(entry.id);
	}

}
