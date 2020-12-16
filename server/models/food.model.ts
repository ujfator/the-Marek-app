import { Base } from './base.model';

export class Food extends Base {
	date: Date = null;
	breakfast: string = null;
	lunch: string = null;
	dinner: string = null;
	junkFood: string = null;
	author: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
