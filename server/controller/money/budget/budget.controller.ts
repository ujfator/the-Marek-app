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

	deleteBudget(id: string): Promise<Budget> {
		return this.model.findByIdAndDelete(id).then((resp) => resp);
	}

	getBudget(id: string): Promise<Budget> {
		return this.model.findById(id).then((resp) => new Budget(resp));
	}

	getBudgets(): Promise<Budget[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new Budget(row));
		});
	}

	setBudgets(budgetItems: Budget[]): Promise<Budget[]> {
		return this.model.insertMany(budgetItems).then((resp) => {
			return resp.map((row) => new Budget(row));
		});
	}

	patchBudget(budgetItem: Budget): Promise<Budget> {
		return this.model.findByIdAndUpdate(budgetItem.id, budgetItem).then((resp) => new Budget(resp));
	}
}
