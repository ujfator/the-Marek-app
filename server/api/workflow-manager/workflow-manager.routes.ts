import { Request, Response } from 'express-serve-static-core';

import { WorkflowItemModel } from 'server/models'

import { WorkflowManagerController, BaseController, BaseInterface } from '../../controller';

export class WorkflowManagerRoutes extends BaseController {
	private _workflowManagerController: WorkflowManagerController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'workflowItemsRoutes');

		this._workflowManagerController = new WorkflowManagerController(args);

		this.__router.get('/:workflowItemId', (req: Request, res: Response) => this._get(req, res));
		this.__router.get('/', (req: Request, res: Response) => this._getAll(req, res));
		this.__router.post('/', (req: Request, res: Response) => this._set(req, res));
	}

	private _get = (req: Request, res: Response): void => {
		this._workflowManagerController.getWorkflowItem(req.params.workflowItemId).then((workflowItem: WorkflowItemModel) => {
			res.jsonp(workflowItem);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _getAll = (req: Request, res: Response): void => {
		this._workflowManagerController.getWorkflowItems().then((workflowItems: WorkflowItemModel[]) => {
			res.jsonp(workflowItems);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _set = (req: Request, res: Response): void => {
		this._workflowManagerController.setWorkflowItems(req.body).then((workflowItems: WorkflowItemModel[]) => {
			res.jsonp(workflowItems);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}
}
