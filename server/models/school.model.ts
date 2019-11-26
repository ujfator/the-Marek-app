import { Base } from './base.model';

export class School extends Base {
	date: Date = null;
	subject: string = null;
    difficulty: string = null;
	typeOfTest: string = null;
	author: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
