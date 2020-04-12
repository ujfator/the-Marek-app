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

	showEditingInput(itemBeingChanged) {
		this.changedItem = itemBeingChanged.name + ' ' + itemBeingChanged.amount;
		const stateChanged = this.items.reduce((acc, item) => {
			if (item.id === itemBeingChanged.id) {
				acc.push({...itemBeingChanged, isBeingEdited: true});
			} else acc.push({...item, isBeingEdited: false});
			return acc;
		}, [])
		this.items = stateChanged;
	}

	valChanged(e) {
		console.log(e);
	}


	editItem(item: Budget) {
		console.log(item);
		const nameAndAmount = this.changedItem.split(' ');
		const name = nameAndAmount.length > 2 ? (nameAndAmount[0] + ' ' + nameAndAmount[1]) : nameAndAmount[0];
		const amount = parseFloat(nameAndAmount[nameAndAmount.length-1]);
		this.service.patchItem({...item, name, amount});
	}

}
