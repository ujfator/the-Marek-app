import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Quality } from 'server/models';
import { QualityService } from '../../common/services/api-calls/quality.service';
import { AddEditQualityItemComponent } from './add-edit-quality-item/add-edit-item.component';
import { AuthorizationQuery } from 'src/app/state-management/authorization/authorization.query';


@Component({
	selector: 'app-quality',
	templateUrl: './quality.component.html',
	styleUrls: ['./quality.component.scss']
})

export class QualityComponent {

	displayedColumns: string[] = ['date', 'dayQuality', 'wakeUp', 'goToBed', 'sleepTime',
	'excercise', 'deepWorkTime', 'meaningfulActivity' ,'author', 'edit'];
	qualities: Quality[] = [];
	allItems: Quality[] = [];

	constructor(
		public dialog: MatDialog,
		private qualityService: QualityService,
		private authorizationQuery: AuthorizationQuery,
	) {
		this.qualityService.items.subscribe((items) => {
		if (items) {
			this.allItems = items;
			if (localStorage.getItem('author')) {
				this.createDataSource(localStorage.getItem('author'))
			} else this.qualities = [...items];
		}
		});

		this.authorizationQuery.selectedUser.subscribe((author) => {
			if (author && author !== 'Oba') {
				this.createDataSource(author);
			} else if (author === 'Oba') this.qualities = [...this.allItems];
		});
	}

	addOrEditEntry(entry?: Quality) {
		const dialogRef = this.dialog.open(AddEditQualityItemComponent, {
			width: '500px',
			data: entry || null,
		});
	}

	booleanTranslator(bool: boolean) {
		if (bool) return 'yes';
		return 'no';
	}

	createDataSource (author?: string) {
		this.qualities = [];
		this.allItems && this.allItems.forEach(element => {
			if (element.author === author) this.qualities.push(element);
		});
	}

	delete(entry: Quality) {
		this.qualityService.deleteItem(entry.id);
	}

	minutes(element): string {
		if (element) {
			if (element.duration > 1) {
				return 'minutes'
			} else return 'minute'
		}
	}

}
