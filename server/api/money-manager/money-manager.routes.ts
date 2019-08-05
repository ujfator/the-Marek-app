import { Request, Response } from 'express-serve-static-core';

import { MoneyItemModel } from 'server/models'

import { MoneyManagerController, BaseController, BaseInterface } from '../../controller';

export class MoneyManagerRoutes extends BaseController {
	private _moneyManagerController: MoneyManagerController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'moneyItemsRoutes');

		this._moneyManagerController = new MoneyManagerController(args);

		this.__router.get('/:moneyItemId', (req: Request, res: Response) => this._get(req, res));
		this.__router.get('/', (req: Request, res: Response) => this._getAll(req, res));
		this.__router.post('/', (req: Request, res: Response) => this._set(req, res));
		this.__router.patch('/', (req: Request, res: Response) => this._patch(req, res));
		this.__router.delete('/:moneyItemId', (req: Request, res: Response) => this._delete(req, res));

	}

	private _delete = (req: Request, res: Response): void => {
		this._moneyManagerController.deleteMoneyItem(req.params.moneyItemId).then((resp: any) => {
			res.jsonp(resp);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}
	private _get = (req: Request, res: Response): void => {
		this._moneyManagerController.getMoneyItem(req.params.moneyItemId).then((moneyItem: MoneyItemModel) => {
			res.jsonp(moneyItem);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _getAll = (req: Request, res: Response): void => {
		this._moneyManagerController.getMoneyItems().then((moneyItems: MoneyItemModel[]) => {
			res.jsonp(moneyItems);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _set = (req: Request, res: Response): void => {
		this._moneyManagerController.setMoneyItems(req.body).then((moneyItems: MoneyItemModel[]) => {
			res.jsonp(moneyItems);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _patch = (req: Request, res: Response): void => {
		this._moneyManagerController.patchMoneyItem(req.body).then((moneyItem: MoneyItemModel) => {
			res.jsonp(moneyItem);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}	
}
