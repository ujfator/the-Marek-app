import { Request, Response } from 'express-serve-static-core';

import { Quality } from '../../models';

import { QualityController, BaseController, BaseInterface } from '../../controller';

export class QualityRoutes extends BaseController {
	private _qualityController: QualityController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'qualityRoutes');

		this._qualityController = new QualityController(args);

		this.__router.get('/:id', (req: Request, res: Response) => this._get(req, res));
		this.__router.get('/', (req: Request, res: Response) => this._getAll(req, res));
		this.__router.post('/', (req: Request, res: Response) => this._set(req, res));
		this.__router.patch('/', (req: Request, res: Response) => this._patch(req, res));
		this.__router.delete('/:id', (req: Request, res: Response) => this._delete(req, res));
	}

	private _delete = (req: Request, res: Response): void => {
		this._qualityController
			.deleteItem(req.params.id)
			.then((resp: any) => {
				res.jsonp(resp);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _get = (req: Request, res: Response): void => {
		this._qualityController
			.getItem(req.params.id)
			.then((item: Quality) => {
				res.jsonp(item);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _getAll = (req: Request, res: Response): void => {
		this._qualityController
			.getItems()
			.then((items: Quality[]) => {
				res.jsonp(items);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _set = (req: Request, res: Response): void => {
		this._qualityController
			.setItems(req.body)
			.then((items: Quality[]) => {
				res.jsonp(items);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _patch = (req: Request, res: Response): void => {
		this._qualityController
			.patchItem(req.body)
			.then((item: Quality) => {
				res.jsonp(item);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};
}
