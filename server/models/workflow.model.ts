import { BaseModel } from './base.model';

export class WorkflowModel extends BaseModel {
	public name: string = null;
  	public content: string = null;
	public container: string = null;
	public author: string = null;
	public dueDate: Date = null;
	public difficulty: string = null;
	  

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
