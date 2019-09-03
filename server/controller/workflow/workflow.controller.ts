import { WorkflowModel } from '../../models';

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
	 * Delete one WorkflowItem Model object.
	 */
	public deleteWorkflowItem(workflowItemId: string): Promise<WorkflowModel> {
		return this.model.findByIdAndDelete(workflowItemId).then((resp) => resp);
	}


	/**
	 * Get one WorkflowItem Model object.
	 */
	public getWorkflowItem(workflowItemId: string): Promise<WorkflowModel> {
		return this.model.findById(workflowItemId).then((resp) => new WorkflowModel(resp));
	}

	/**
	 * Get all WorkflowItems as WorkflowItem Model objects.
	 */
	public getWorkflowItems(): Promise<WorkflowModel[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new WorkflowModel(row));
		});
	}

	/**
	 * Add a new WorkflowItem to the Database by the given Data object list.
	 * It will return the added WorkflowItems passed to the WorkflowItem Model object.
	 */
	public setWorkflowItems(workflowItems: WorkflowModel[]): Promise<WorkflowModel[]> {
		return this.model.insertMany(workflowItems).then((resp) => {
			return resp.map((row) => new WorkflowModel(row));
		});
	}

	/**
	 * Patch WorkflowItem to the Database with the given Data.
	 * It will return the patched WorkflowItems passed to the WorkflowItem Model object.
	 */
	public patchWorkflowItem(workflowItem: WorkflowModel): Promise<WorkflowModel> {
		return this.model.findByIdAndUpdate(workflowItem.id, workflowItem).then((resp) => new WorkflowModel(resp));
	}
}
