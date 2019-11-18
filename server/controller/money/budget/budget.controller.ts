import { Budget } from '../../../models';

import { BudgetSchema } from '../../../schema/budget.schema';
import { BaseController } from '../../base.controller';
import { BaseInterface } from '../../base.interface';

export class BudgetController extends BaseController {
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'budgetItems';
		this.modelName = 'budgetItem';
		this.schema = BudgetSchema;
	}

	
	/**
	 * Delete one Budget  object.
	 */
	public deleteBudget(id: string): Promise<Budget> {
		return this.model.findByIdAndDelete(id).then((resp) => resp);
	}

	/**
	 * Get one Budget  object.
	 */
	public getBudget(id: string): Promise<Budget> {
		return this.model.findById(id).then((resp) => new Budget(resp));
	}

	/**
	 * Get all Budgets as Budget  objects.
	 */
	public getBudgets(): Promise<Budget[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new Budget(row));
		});
	}

	/**
	 * Add a new Budget to the Database by the given Data object list.
	 * It will return the added Budgets passed to the Budget  object.
	 */
	public setBudgets(budgetItems: Budget[]): Promise<Budget[]> {
		return this.model.insertMany(budgetItems).then((resp) => {
			return resp.map((row) => new Budget(row));
		});
	}

	/**
	 * Patch Budget to the Database with the given Data.
	 * It will return the patched Budgets passed to the Budget  object.
	 */
	public patchBudget(budgetItem: Budget): Promise<Budget> {
		return this.model.findByIdAndUpdate(budgetItem.id, budgetItem).then((resp) => new Budget(resp));
	}
}
