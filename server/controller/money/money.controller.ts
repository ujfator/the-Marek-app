import { MoneyModel } from '../../models';

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
	 * Delete one MoneyItem Model object.
	 */
	public deleteMoneyItem(itemId: string): Promise<MoneyModel> {
		return this.model.findByIdAndDelete(itemId).then((resp) => resp);
	}

	/**
	 * Get one MoneyItem Model object.
	 */
	public getMoneyItem(itemId: string): Promise<MoneyModel> {
		return this.model.findById(itemId).then((resp) => new MoneyModel(resp));
	}

	/**
	 * Get all MoneyItems as MoneyItem Model objects.
	 */
	public getMoneyItems(): Promise<MoneyModel[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new MoneyModel(row));
		});
	}

	/**
	 * Add a new MoneyItem to the Database by the given Data object list.
	 * It will return the added MoneyItems passed to the MoneyItem Model object.
	 */
	public setMoneyItems(items: MoneyModel[]): Promise<MoneyModel[]> {
		return this.model.insertMany(items).then((resp) => {
			return resp.map((row) => new MoneyModel(row));
		});
	}

	/**
	 * Patch MoneyItem to the Database with the given Data.
	 * It will return the patched MoneyItems passed to the MoneyItem Model object.
	 */
	public patchMoneyItem(item: MoneyModel): Promise<MoneyModel> {
		return this.model.findByIdAndUpdate(item.id, item).then((resp) => new MoneyModel(resp));
	}
}
