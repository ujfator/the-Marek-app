import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SchoolService } from '../../common/services/api-calls/school.service';
import { School } from 'server/models';
import { AddEditSchoolItemComponent } from './add-edit-school-item/add-edit-item.component';
import { AuthorizationQuery } from 'src/app/state-management/authorization/authorization.query';


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
		private authorizationQuery: AuthorizationQuery,
	) {
		this.schoolService.items.subscribe((items) => {
			if (items) {
				this.allItems = [...items];
				if (localStorage.getItem('author')) {
					this.createDataSource(localStorage.getItem('author'))
				} else this.dataSource = [...items];
			}
		});

		this.authorizationQuery.selectedUser.subscribe((author) => {
			this.createDataSource(author);
			// this.dataSource = [...this.allItems];
		});
  	}

	addOrEditEntry(entry?: School) {
		const dialogRef = this.dialog.open(AddEditSchoolItemComponent);
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
