import { BaseModel } from './base.model';

export class WorkflowItemModel extends BaseModel {
	public name: string = null;
  	public content: string = null;
  	public container: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
