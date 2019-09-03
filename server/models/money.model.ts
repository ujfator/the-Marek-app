import { BaseModel } from './base.model';

export class MoneyModel extends BaseModel {
	public name: string = null;
	public price: number = null;
	public savings?: number = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
