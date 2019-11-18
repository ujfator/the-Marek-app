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

	
	/**
	 * Delete one MoneyItem  object.
	 */
	public deleteMoneyItem(id: string): Promise<Money> {
		return this.model.findByIdAndDelete(id).then((resp) => resp);
	}

	/**
	 * Get one MoneyItem  object.
	 */
	public getMoneyItem(id: string): Promise<Money> {
		return this.model.findById(id).then((resp) => new Money(resp));
	}

	/**
	 * Get all MoneyItems as MoneyItem  objects.
	 */
	public getMoneyItems(): Promise<Money[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new Money(row));
		});
	}

	/**
	 * Add a new MoneyItem to the Database by the given Data object list.
	 * It will return the added MoneyItems passed to the MoneyItem  object.
	 */
	public setMoneyItems(items: Money[]): Promise<Money[]> {
		return this.model.insertMany(items).then((resp) => {
			return resp.map((row) => new Money(row));
		});
	}

	/**
	 * Patch MoneyItem to the Database with the given Data.
	 * It will return the patched MoneyItems passed to the MoneyItem  object.
	 */
	public patchMoneyItem(item: Money): Promise<Money> {
		return this.model.findByIdAndUpdate(item.id, item).then((resp) => new Money(resp));
	}
}
