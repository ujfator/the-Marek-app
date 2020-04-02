import { Component, Input, SimpleChanges } from '@angular/core';
import { Budget } from 'server/models';
import { MatDialog } from '@angular/material/dialog';
import { BudgetService } from 'src/app/common/services/api-calls/budget.service';
import { MoneyDialogComponent } from '../money-dialog/money-dialog.component';

@Component({
  selector: 'app-money-tile',
  templateUrl: './money-tile.component.html',
  styleUrls: ['./money-tile.component.scss']
})
export class MoneyTileComponent {

	header: string;
	image: string;

	@Input() items: Budget[];

	constructor(
		public dialog: MatDialog,
		private service: BudgetService
		) {}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(this.items)
		if (this.items && this.items.length) {
			this.header = this.items[0].nature;
			this.image = this.header + '-image';
		};

	}

	accumulator(source: Budget[]): number {
		return source.reduce((acc, item) => {
			acc = Math.round((acc + item.amount) * 100) / 100;
			return acc;;
		}, 0)
	}

	delete(id: string) {
		this.service.deleteItem(id);
	}

}
