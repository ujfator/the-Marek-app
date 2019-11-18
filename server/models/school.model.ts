import { Base } from './base.model';

export class School extends Base {
	public date: Date = null;
	public subject: string = null;
    public difficulty: string = null;
	public typeOfTest: string = null;
	public author: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}