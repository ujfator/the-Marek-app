import { Base } from './base.model';

export class Difficulty extends Base {
	difficulty: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
