import { Base } from './base.model';

export class Budget extends Base {
	public name: string = null;
	public amount: number = null;
	public nature: string = null;
	public author: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
