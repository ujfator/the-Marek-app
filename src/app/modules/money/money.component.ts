import { ChangeDetectorRef, Component } from '@angular/core';

import { Money, Budget } from 'server/models';
import { BudgetService } from '../../common/services/api-calls/budget.service';
import { MatDialog } from '@angular/material/dialog';
import { MoneyDialogComponent } from './money-dialog/money-dialog.component';
import { MarekCommon } from 'src/app/common/components/common.component';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface Items {
	fixedExpenses: Budget[];
	adjustableExpenses: Budget[];
	savings: Budget[];
	properties: Budget[];
	loans: Budget[];
}

@Component({
	selector: 'app-money',
	templateUrl: './money.component.html',
	styleUrls: ['./money.component.scss'],
})
export class MoneyComponent extends MarekCommon {
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
	chartView: boolean = false;
	chartBackground: SafeStyle;
	chartData: {
		all: number,
		dangerous: number,
		safe: number,
		mixed: number
	}

	constructor(public dialog: MatDialog, private service: BudgetService, private cdr: ChangeDetectorRef, public sanitizer: DomSanitizer) {
		super();
		this.service.items.pipe(takeUntil(this.destroyed)).subscribe((items) => {
			this.emptyColumns();
			if (items) {
				items.forEach((item) => {
					switch (item.nature) {
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
					}
				});
			};
			setTimeout(() => {
				this.generateChart();
			}, 1000)
		});
	}

	changeView() {
		this.chartView = !this.chartView;
	}

	generateChart() {
		this.chartData = {
			all: 0,
			dangerous: 0,
			safe: 0,
			mixed: 0
		};
		for (const saving of this.items.savings) {
			this.chartData.all += saving.amount;
			if (saving.name.includes('akcie')) {
				this.chartData.mixed += saving.amount;
			} else if (saving.name.includes('crypto')) {
				this.chartData.dangerous += saving.amount;
			} else {
				this.chartData.safe += saving.amount;
			}
		};
		this.chartBackground = 
		`background: conic-gradient(#dd521c 0 ${this.chartData.dangerous/(this.chartData.all/100)}%,
		#d1d50b 0 ${this.chartData.mixed/(this.chartData.all/100)}%,
		#0aab1e 0 ${this.chartData.safe/(this.chartData.all/100)}%);`;
		this.cdr.detectChanges();
	}

	add() {
		console.log(this.natures);
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
	}
}
