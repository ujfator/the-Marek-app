import { MoneyItemModel } from '../../models';

import { MoneyItemSchema } from '../../schema/money-manager.schema';
import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';

export class MoneyManagerController extends BaseController {
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'moneyItems';
		this.modelName = 'moneyItem';
		this.schema = MoneyItemSchema;
	}

	
	/**
	 * Delete one MoneyItem Model object.
	 */
	public deleteMoneyItem(moneyItemId: string): Promise<MoneyItemModel> {
		return this.model.findByIdAndDelete(moneyItemId).then((resp) => resp);
	}

	/**
	 * Get one MoneyItem Model object.
	 */
	public getMoneyItem(moneyItemId: string): Promise<MoneyItemModel> {
		return this.model.findById(moneyItemId).then((resp) => new MoneyItemModel(resp));
	}

	/**
	 * Get all MoneyItems as MoneyItem Model objects.
	 */
	public getMoneyItems(): Promise<MoneyItemModel[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new MoneyItemModel(row));
		});
	}

	/**
	 * Add a new MoneyItem to the Database by the given Data object list.
	 * It will return the added MoneyItems passed to the MoneyItem Model object.
	 */
	public setMoneyItems(moneyItems: MoneyItemModel[]): Promise<MoneyItemModel[]> {
		return this.model.insertMany(moneyItems).then((resp) => {
			return resp.map((row) => new MoneyItemModel(row));
		});
	}

	/**
	 * Patch MoneyItem to the Database with the given Data.
	 * It will return the patched MoneyItems passed to the MoneyItem Model object.
	 */
	public patchMoneyItem(moneyItem: MoneyItemModel): Promise<MoneyItemModel> {
		return this.model.findByIdAndUpdate(moneyItem.id, moneyItem).then((resp) => new MoneyItemModel(resp));
	}
}
