import { BaseModel } from './base.model';

export class SportItemModel extends BaseModel {
	public date: Date = null;
	public sport: string = null;
    public difficulty: string = null;
	public duration: number = null;
	public author: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
