import { Request, Response } from 'express-serve-static-core';

import { DifficultyController, BaseController, BaseInterface } from '../../controller';

export class DifficultyRoutes extends BaseController {
	private _difficultyController: DifficultyController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'difficultyRoutes');

		this._difficultyController = new DifficultyController(args);

		this.__router.get('/', (req: Request, res: Response) => this._getAll(req, res));
		this.__router.post('/', (req: Request, res: Response) => this._set(req, res));

	}



	private _getAll = (req: Request, res: Response): void => {
		this._difficultyController.getDifficulties().then((difficulties: string[]) => {
			res.jsonp(difficulties);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _set = (req: Request, res: Response): void => {
		this._difficultyController.setDifficulty(req.body).then((difficulty: string) => {
			res.jsonp(difficulty);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}
}
