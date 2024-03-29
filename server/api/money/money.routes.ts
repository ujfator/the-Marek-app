import { Request, Response } from 'express-serve-static-core';

import { Money } from '../../models';

import { MoneyController, BaseController, BaseInterface } from '../../controller';

export class MoneyRoutes extends BaseController {
	private _moneyController: MoneyController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'moneyRoutes');

		this._moneyController = new MoneyController(args);

		this.__router.get('/:id', (req: Request, res: Response) => this._get(req, res));
		this.__router.get('/', (req: Request, res: Response) => this._getAll(req, res));
		this.__router.post('/', (req: Request, res: Response) => this._set(req, res));
		this.__router.patch('/', (req: Request, res: Response) => this._patch(req, res));
		this.__router.delete('/:id', (req: Request, res: Response) => this._delete(req, res));
	}

	private _delete = (req: Request, res: Response): void => {
		this._moneyController
			.deleteMoneyItem(req.params.id)
			.then((resp: any) => {
				res.jsonp(resp);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};
	
	private _get = (req: Request, res: Response): void => {
		this._moneyController
			.getMoneyItem(req.params.id)
			.then((moneyItem: Money) => {
				res.jsonp(moneyItem);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _getAll = (req: Request, res: Response): void => {
		this._moneyController
			.getMoneyItems()
			.then((moneyItems: Money[]) => {
				res.jsonp(moneyItems);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _set = (req: Request, res: Response): void => {
		this._moneyController
			.setMoneyItems(req.body)
			.then((moneyItems: Money[]) => {
				res.jsonp(moneyItems);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _patch = (req: Request, res: Response): void => {
		this._moneyController
			.patchMoneyItem(req.body)
			.then((moneyItem: Money) => {
				res.jsonp(moneyItem);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};
}
