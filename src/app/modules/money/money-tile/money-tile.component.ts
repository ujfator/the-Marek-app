import { Component, Input, SimpleChanges } from '@angular/core';
import { Budget } from 'server/models';
import { MatDialog } from '@angular/material/dialog';
import { BudgetService } from 'src/app/common/services/api-calls/budget.service';


@Component({
  selector: 'app-money-tile',
  templateUrl: './money-tile.component.html',
  styleUrls: ['./money-tile.component.scss']
})
export class MoneyTileComponent {

	header: string;
	image: string;
	changedItem: string;

	@Input() items: Budget[];

	constructor(
		public dialog: MatDialog,
		private service: BudgetService
		) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.items && this.items.length) {
			this.items = this.items.reduce((acc, item) => {
				acc.push({...item, isBeingEdited: false});
				return acc;
			}, [])
			this.header = this.items[0].nature;
			this.image = this.header + '-image';
		};

	}

	accumulator(source: Budget[], amountOrMax: string): number {
		return source.reduce((acc, item) => {
			acc = Math.round((acc + (amountOrMax === 'amount' ? item.amount : item.maximum)) * 100) / 100;
			return acc;;
		}, 0)
	}

	delete(id: string) {
		this.service.deleteItem(id);
	}

	showEditingInput(changed: Budget) {
		this.changedItem = changed.name + ' ' + changed.amount.toString() + (changed.nature === 'adjustables' ? (' - ' + changed.maximum.toString()) : '');
		const stateChanged = this.items.reduce((acc, item) => {
			if (item.id === changed.id) {
				acc.push({...changed, isBeingEdited: true});
			} else acc.push({...item, isBeingEdited: false});
			return acc;
		}, [])
		this.items = stateChanged;
	}

	valChanged(e) {
	}


	editItem(item: Budget) {
		const nameAndAmount = this.changedItem.split(' ');
		let i = 0;
		let name = '';
		while (i < (item.nature === 'adjustables' ? nameAndAmount.length-3 : nameAndAmount.length-1)) {
			name += (' ' + nameAndAmount[i]);
			i++;
		}
		const amount = item.nature === 'adjustables' ? parseFloat(nameAndAmount[nameAndAmount.length-3]) : parseFloat(nameAndAmount[nameAndAmount.length-1]);
		const maximum = item.nature === 'adjustables' ? parseFloat(nameAndAmount[nameAndAmount.length-1]) : null;
		this.service.patchItem({...item, name, amount, maximum});
	}

}
