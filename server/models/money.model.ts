import { Base } from './base.model';

export class Money extends Base {
	name: string = null;
	price: number = null;
	savings?: number = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
