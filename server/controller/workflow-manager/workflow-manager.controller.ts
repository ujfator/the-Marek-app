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
	 * Get one WorkflowItem Model object.
	 */
	public getWorkflowItem(workflowItemId: string): Promise<WorkflowItemModel> {
		return this.model.findById(workflowItemId).then((resp) => {
			return new WorkflowItemModel(resp);
		});
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
}
