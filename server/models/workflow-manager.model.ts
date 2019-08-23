import { BaseModel } from './base.model';

export class WorkflowItemModel extends BaseModel {
	public name: string = null;
  	public content: string = null;
	public container: string = null;
	public author: string = null;
	public dueDate: Date = null;
	  

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
