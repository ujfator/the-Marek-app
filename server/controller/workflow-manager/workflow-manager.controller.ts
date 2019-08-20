import { WorkflowItemModel } from '../../models';

import { WorkflowItemSchema } from '../../schema/workflow-manager.schema';
import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';

export class WorkflowManagerController extends BaseController {
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'workflowItems';
		this.modelName = 'workflowItem';
		this.schema = WorkflowItemSchema;
	}
	
	/**
	 * Delete one WorkflowItem Model object.
	 */
	public deleteWorkflowItem(workflowItemId: string): Promise<WorkflowItemModel> {
		return this.model.findByIdAndDelete(workflowItemId).then((resp) => resp);
	}


	/**
	 * Get one WorkflowItem Model object.
	 */
	public getWorkflowItem(workflowItemId: string): Promise<WorkflowItemModel> {
		return this.model.findById(workflowItemId).then((resp) => new WorkflowItemModel(resp));
	}

	/**
	 * Get all WorkflowItems as WorkflowItem Model objects.
	 */
	public getWorkflowItems(): Promise<WorkflowItemModel[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new WorkflowItemModel(row));
		});
	}

	/**
	 * Add a new WorkflowItem to the Database by the given Data object list.
	 * It will return the added WorkflowItems passed to the WorkflowItem Model object.
	 */
	public setWorkflowItems(workflowItems: WorkflowItemModel[]): Promise<WorkflowItemModel[]> {
		return this.model.insertMany(workflowItems).then((resp) => {
			return resp.map((row) => new WorkflowItemModel(row));
		});
	}

	/**
	 * Patch WorkflowItem to the Database with the given Data.
	 * It will return the patched WorkflowItems passed to the WorkflowItem Model object.
	 */
	public patchWorkflowItem(workflowItem: WorkflowItemModel): Promise<WorkflowItemModel> {
		return this.model.findByIdAndUpdate(workflowItem.id, workflowItem).then((resp) => new WorkflowItemModel(resp));
	}
}
