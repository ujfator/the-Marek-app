import { Workflow } from '../../models';

import { WorkflowSchema } from '../../schema/workflow.schema';
import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';

export class WorkflowController extends BaseController {
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'workflowItems';
		this.modelName = 'workflowItem';
		this.schema = WorkflowSchema;
	}
	
	/**
	 * Delete one WorkflowItem  object.
	 */
	public deleteWorkflowItem(workflowItemId: string): Promise<Workflow> {
		return this.model.findByIdAndDelete(workflowItemId).then((resp) => resp);
	}


	/**
	 * Get one WorkflowItem  object.
	 */
	public getWorkflowItem(workflowItemId: string): Promise<Workflow> {
		return this.model.findById(workflowItemId).then((resp) => new Workflow(resp));
	}

	/**
	 * Get all WorkflowItems as WorkflowItem  objects.
	 */
	public getWorkflowItems(): Promise<Workflow[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new Workflow(row));
		});
	}

	/**
	 * Add a new WorkflowItem to the Database by the given Data object list.
	 * It will return the added WorkflowItems passed to the WorkflowItem  object.
	 */
	public setWorkflowItems(workflowItems: Workflow[]): Promise<Workflow[]> {
		return this.model.insertMany(workflowItems).then((resp) => {
			return resp.map((row) => new Workflow(row));
		});
	}

	/**
	 * Patch WorkflowItem to the Database with the given Data.
	 * It will return the patched WorkflowItems passed to the WorkflowItem  object.
	 */
	public patchWorkflowItem(workflowItem: Workflow): Promise<Workflow> {
		return this.model.findByIdAndUpdate(workflowItem.id, workflowItem).then((resp) => new Workflow(resp));
	}
}
