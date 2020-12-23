import { Base } from './base.model';

export class Food extends Base {
	date: Date = null;
	firstFood: string = null;
	lastFood: string = null;
	author: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
