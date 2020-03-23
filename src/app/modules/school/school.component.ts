import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SchoolService } from '../../common/services/api-calls/school.service';
import { DialogService } from '../../common/services/api-calls/dialog.service';
import { School } from 'server/models';
import { AuthorService } from 'src/app/common/services/local-services/author.service';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})

export class SchoolComponent {

	displayedColumns: string[] = ['date', 'subject', 'typeOfTest', 'difficulty', 'author', 'edit'];
	dataSource: School[] = [];
	allItems: School[] = [];

	constructor(
		public dialog: MatDialog,
		private schoolService: SchoolService,
		private dialogService: DialogService,
		private authorService: AuthorService,
	) {
		this.schoolService.items.subscribe((items) => {
			if (items) {
				this.allItems = [...items];
				if (localStorage.getItem('author')) {
					this.createDataSource(localStorage.getItem('author'))
				} else this.dataSource = [...items];
			}
		});

		this.dialogService.data.subscribe((data: any) => {
			if (data && data.origin === 'school') {
				const item = {...data.item};
				this.dialogService.data.next(null);
				if (item.id) {
					this.schoolService.patchItem(item);
				} else this.schoolService.addItem(item);
			};
		});

		this.authorService.author.subscribe((author) => {
			if (author && author !== 'Oba') {
				this.createDataSource(author);
			} else if (author === 'Oba') this.dataSource = [...this.allItems];
		});
  	}

	addOrEditEntry(entry?: School) {
		this.dialogService.data.next(null);
		this.dialogService.addEditItem('school', entry);
	}

	createDataSource (author?: string) {
		this.dataSource = [];
		this.allItems && this.allItems.forEach(element => {
			if (element.author === author) this.dataSource.push(element);
		});
	}

	delete(entry: School) {
		this.schoolService.deleteItem(entry.id);
	}

}
