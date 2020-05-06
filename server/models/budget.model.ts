import { Base } from './base.model';

export class Budget extends Base {
	name: string = null;
	amount: number = null;
	nature: string = null;
	author: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
