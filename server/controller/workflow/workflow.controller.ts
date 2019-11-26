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

	deleteWorkflowItem(workflowItemId: string): Promise<Workflow> {
		return this.model.findByIdAndDelete(workflowItemId).then((resp) => resp);
	}

	getWorkflowItem(workflowItemId: string): Promise<Workflow> {
		return this.model.findById(workflowItemId).then((resp) => new Workflow(resp));
	}

	getWorkflowItems(): Promise<Workflow[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new Workflow(row));
		});
	}

	setWorkflowItems(workflowItems: Workflow[]): Promise<Workflow[]> {
		return this.model.insertMany(workflowItems).then((resp) => {
			return resp.map((row) => new Workflow(row));
		});
	}

	patchWorkflowItem(workflowItem: Workflow): Promise<Workflow> {
		return this.model.findByIdAndUpdate(workflowItem.id, workflowItem).then((resp) => new Workflow(resp));
	}
}
