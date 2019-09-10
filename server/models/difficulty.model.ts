import { BaseModel } from './base.model';

export class DifficultyModel extends BaseModel {
	public difficulty: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}