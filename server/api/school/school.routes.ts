import { Request, Response } from 'express-serve-static-core';

import { SchoolController, BaseController, BaseInterface } from '../../controller';
import { School } from 'models';

export class SchoolRoutes extends BaseController {
	private _schoolController: SchoolController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'schoolRoutes');

		this._schoolController = new SchoolController(args);

		this.__router.get('/', (req: Request, res: Response) => this._getAll(req, res));
		this.__router.post('/', (req: Request, res: Response) => this._set(req, res));
		this.__router.patch('/:id', (req: Request, res: Response) => this._patch(req, res));
		this.__router.delete('/:id', (req: Request, res: Response) => this._delete(req, res));
	}

	private _delete = (req: Request, res: Response): void => {
		this._schoolController
			.deleteItem(req.params.id)
			.then((resp: any) => {
				res.jsonp(resp);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _getAll = (req: Request, res: Response): void => {
		this._schoolController
			.getItems()
			.then((schools: School[]) => {
				res.jsonp(schools);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _set = (req: Request, res: Response): void => {
		this._schoolController
			.setItem(req.body)
			.then((school: School) => {
				res.jsonp(school);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};

	private _patch = (req: Request, res: Response): void => {
		this._schoolController
			.patchItem(req.body)
			.then((school: School) => {
				res.jsonp(school);
			})
			.catch((e: any) => {
				res.status(500).send(e);
				console.warn(e);
			});
	};
}
