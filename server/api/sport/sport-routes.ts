import { Request, Response } from 'express-serve-static-core';

import { SportItemModel } from '../../../server/models'

import { SportController, BaseController, BaseInterface } from '../../controller';

export class SportRoutes extends BaseController {
	private _sportController: SportController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'sportRoutes');

		this._sportController = new SportController(args);

		this.__router.get('/:itemId', (req: Request, res: Response) => this._get(req, res));
		this.__router.get('/', (req: Request, res: Response) => this._getAll(req, res));
		this.__router.post('/', (req: Request, res: Response) => this._set(req, res));
		this.__router.patch('/', (req: Request, res: Response) => this._patch(req, res));
		this.__router.delete('/:itemId', (req: Request, res: Response) => this._delete(req, res));

	}

	private _delete = (req: Request, res: Response): void => {
		this._sportController.deleteSportItem(req.params.itemId).then((resp: any) => {
			res.jsonp(resp);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}
	private _get = (req: Request, res: Response): void => {
		this._sportController.getSportItem(req.params.itemId).then((moneyItem: SportItemModel) => {
			res.jsonp(moneyItem);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _getAll = (req: Request, res: Response): void => {
		this._sportController.getSportItems().then((moneyItems: SportItemModel[]) => {
			res.jsonp(moneyItems);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _set = (req: Request, res: Response): void => {
		this._sportController.setSportItems(req.body).then((moneyItems: SportItemModel[]) => {
			res.jsonp(moneyItems);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _patch = (req: Request, res: Response): void => {
		this._sportController.patchSportItem(req.body).then((moneyItem: SportItemModel) => {
			res.jsonp(moneyItem);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}	
}
