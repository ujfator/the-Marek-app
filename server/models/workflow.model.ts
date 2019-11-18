import { Base } from './base.model';

export class Workflow extends Base {
	public name: string = null;
  	public content: string = null;
	public container: string = null;
	public author: string = null;
	public finished: Date = null;
	public difficulty: string = null;
	  

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
