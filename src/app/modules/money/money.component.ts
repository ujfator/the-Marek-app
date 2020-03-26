import { Component } from '@angular/core';

import { Money, Budget } from 'server/models';
import { MoneyService } from '../../common/services/api-calls/money.service';
import { BudgetService } from '../../common/services/api-calls/budget.service';
import { MatDialog } from '@angular/material';
import { MoneyDialogComponent } from './money-dialog/money-dialog.component';

interface Items {
	expenses: Budget[],
	savings: Budget[],
	properties: Budget[],
	loans: Budget[],
}

@Component({
	selector: 'app-money',
	templateUrl: './money.component.html',
	styleUrls: ['./money.component.scss']
})
export class MoneyComponent {

	moneyItems: Money[];
	items: Items = {
		expenses: [],
		savings: [],
		properties: [],
		loans: [],
	};
	objectKeys = Object.keys;

	constructor(
		public dialog: MatDialog,
		private service: BudgetService,
	) {
		this.service.items.subscribe((items) => {
			this.emptyColumns();
			if (items) {
				items.forEach(item => {
					switch(item.nature) {
						case 'expenses':
							this.items.expenses.push(item);
							break;
						case 'savings':
							this.items.savings.push(item);
							break;
						case 'loans':
							this.items.loans.push(item);
							break;
						case 'properties':
							this.items.properties.push(item);
							break;
					};
				});
			};
		});
	}

	add() {
		const dialogRef = this.dialog.open(MoneyDialogComponent);
	}

	emptyColumns(): void {
		for (const key in this.items) this.items[key] = [];
	};
}
