import { BaseModel } from './base.model';

export class BudgetItemModel extends BaseModel {
	public name: string = null;
	public price: number = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
