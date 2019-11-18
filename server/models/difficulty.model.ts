import { Base } from './base.model';

export class Difficulty extends Base {
	public difficulty: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}