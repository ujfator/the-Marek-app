import { Request, Response } from 'express-serve-static-core';

import { Workflow } from '../../models';

import { WorkflowController, BaseController, BaseInterface } from '../../controller';

export class WorkflowRoutes extends BaseController {
	private _workflowController: WorkflowController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'workflowRoutes');

		this._workflowController = new WorkflowController(args);

		this.__router.get('/:workflowItemId', (req: Request, res: Response) => this._get(req, res));
		this.__router.get('/', (req: Request, res: Response) => this._getAll(req, res));
		this.__router.post('/', (req: Request, res: Response) => this._set(req, res));
		this.__router.patch('/', (req: Request, res: Response) => this._patch(req, res));
		this.__router.delete('/:workflowItemId', (req: Request, res: Response) => this._delete(req, res));
	}

	private _delete = (req: Request, res: Response): void => {
		this._workflowController
			.deleteWorkflowItem(req.params.workflowItemId)
			.then((resp: any) => {
				res.jsonp(resp);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _get = (req: Request, res: Response): void => {
		this._workflowController
			.getWorkflowItem(req.params.workflowItemId)
			.then((workflowItem: Workflow) => {
				res.jsonp(workflowItem);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _getAll = (req: Request, res: Response): void => {
		this._workflowController
			.getWorkflowItems()
			.then((workflowItems: Workflow[]) => {
				res.jsonp(workflowItems);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _set = (req: Request, res: Response): void => {
		this._workflowController
			.setWorkflowItems(req.body)
			.then((workflowItems: Workflow[]) => {
				res.jsonp(workflowItems);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _patch = (req: Request, res: Response): void => {
		this._workflowController
			.patchWorkflowItem(req.body)
			.then((workflowItem: Workflow) => {
				res.jsonp(workflowItem);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};
}
