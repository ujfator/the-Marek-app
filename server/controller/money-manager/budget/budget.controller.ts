import { BudgetItemModel } from '../../../models';

import { BudgetItemSchema } from '../../../schema/budget.schema';
import { BaseController } from '../../base.controller';
import { BaseInterface } from '../../base.interface';

export class BudgetController extends BaseController {
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'budgetItems';
		this.modelName = 'budgetItem';
		this.schema = BudgetItemSchema;
	}

	
	/**
	 * Delete one BudgetItem Model object.
	 */
	public deleteBudgetItem(budgetItemId: string): Promise<BudgetItemModel> {
		return this.model.findByIdAndDelete(budgetItemId).then((resp) => resp);
	}

	/**
	 * Get one BudgetItem Model object.
	 */
	public getBudgetItem(budgetItemId: string): Promise<BudgetItemModel> {
		return this.model.findById(budgetItemId).then((resp) => new BudgetItemModel(resp));
	}

	/**
	 * Get all BudgetItems as BudgetItem Model objects.
	 */
	public getBudgetItems(): Promise<BudgetItemModel[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new BudgetItemModel(row));
		});
	}

	/**
	 * Add a new BudgetItem to the Database by the given Data object list.
	 * It will return the added BudgetItems passed to the BudgetItem Model object.
	 */
	public setBudgetItems(budgetItems: BudgetItemModel[]): Promise<BudgetItemModel[]> {
		return this.model.insertMany(budgetItems).then((resp) => {
			return resp.map((row) => new BudgetItemModel(row));
		});
	}

	/**
	 * Patch BudgetItem to the Database with the given Data.
	 * It will return the patched BudgetItems passed to the BudgetItem Model object.
	 */
	public patchBudgetItem(budgetItem: BudgetItemModel): Promise<BudgetItemModel> {
		return this.model.findByIdAndUpdate(budgetItem.id, budgetItem).then((resp) => new BudgetItemModel(resp));
	}
}
