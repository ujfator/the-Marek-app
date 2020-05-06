import { Component } from '@angular/core';

import { Money, Budget } from 'server/models';
import { BudgetService } from '../../common/services/api-calls/budget.service';
import { MatDialog } from '@angular/material/dialog';
import { MoneyDialogComponent } from './money-dialog/money-dialog.component';

interface Items {
	fixedExpenses: Budget[],
	adjustableExpenses: Budget[],
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
		fixedExpenses: [],
		adjustableExpenses: [],
		savings: [],
		properties: [],
		loans: [],
	};
	objectKeys = Object.keys;
	natures: string[] = [];

	constructor(
		public dialog: MatDialog,
		private service: BudgetService,
	) {
		this.service.items.subscribe((items) => {
			this.emptyColumns();
			if (items) {
				items.forEach(item => {
					switch(item.nature) {
						case 'fixedExpenses':
							this.items.fixedExpenses.push(item);
							break;
						case 'adjustableExpenses':
							this.items.adjustableExpenses.push(item);
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
		console.log(this.natures)
		const dialogRef = this.dialog.open(MoneyDialogComponent, {
			width: '500px',
			data: this.natures,
		});
	}

	emptyColumns(): void {
		this.natures = [];
		for (const key in this.items) {
			this.natures.push(key);
			this.items[key] = [];
		}
	};
}
