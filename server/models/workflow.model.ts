import { Base } from './base.model';

export class Workflow extends Base {
	name: string = null;
  	content: string = null;
	container: string = null;
	author: string = null;
	finished?: Date = null;
	difficulty: string = null;


	constructor(args: any) {
		super();
		this.__init(args);
	}
}
