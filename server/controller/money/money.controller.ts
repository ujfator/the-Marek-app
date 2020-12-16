import { Money } from '../../models';
import { MoneySchema } from '../../schema/money.schema';
import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';

export class MoneyController extends BaseController {
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'moneyItems';
		this.modelName = 'moneyItem';
		this.schema = MoneySchema;
	}

	deleteMoneyItem(id: string): Promise<Money> {
		return this.model.findByIdAndDelete(id).then((resp) => resp);
	}

	getMoneyItem(id: string): Promise<Money> {
		return this.model.findById(id).then((resp) => new Money(resp));
	}

	getMoneyItems(): Promise<Money[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new Money(row));
		});
	}

	setMoneyItems(items: Money[]): Promise<Money[]> {
		return this.model.insertMany(items).then((resp) => {
			return resp.map((row) => new Money(row));
		});
	}

	patchMoneyItem(item: Money): Promise<Money> {
		return this.model.findByIdAndUpdate(item.id, item).then((resp) => new Money(resp));
	}
}
