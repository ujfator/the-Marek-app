import { Request, Response } from 'express-serve-static-core';

import { BudgetItemModel } from '../../models'

import { BudgetController, BaseController, BaseInterface } from '../../controller';

export class BudgetRoutes extends BaseController {
	private _budgetController: BudgetController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'budgetRoutes');

		this._budgetController = new BudgetController(args);

		this.__router.get('/:budgetItemId', (req: Request, res: Response) => this._get(req, res));
		this.__router.get('/', (req: Request, res: Response) => this._getAll(req, res));
		this.__router.post('/', (req: Request, res: Response) => this._set(req, res));
		this.__router.patch('/', (req: Request, res: Response) => this._patch(req, res));
		this.__router.delete('/:budgetItemId', (req: Request, res: Response) => this._delete(req, res));

	}

	private _delete = (req: Request, res: Response): void => {
		this._budgetController.deleteBudgetItem(req.params.budgetItemId).then((resp: any) => {
			res.jsonp(resp);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}
	private _get = (req: Request, res: Response): void => {
		this._budgetController.getBudgetItem(req.params.budgetItemId).then((budgetItem: BudgetItemModel) => {
			res.jsonp(budgetItem);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _getAll = (req: Request, res: Response): void => {
		this._budgetController.getBudgetItems().then((budgetItems: BudgetItemModel[]) => {
			res.jsonp(budgetItems);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _set = (req: Request, res: Response): void => {
		this._budgetController.setBudgetItems(req.body).then((budgetItems: BudgetItemModel[]) => {
			res.jsonp(budgetItems);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _patch = (req: Request, res: Response): void => {
		this._budgetController.patchBudgetItem(req.body).then((budgetItem: BudgetItemModel) => {
			res.jsonp(budgetItem);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}	
}
