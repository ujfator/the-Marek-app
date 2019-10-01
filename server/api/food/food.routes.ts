import { Request, Response } from 'express-serve-static-core';

import { FoodController, BaseController, BaseInterface } from '../../controller';
import { FoodModel } from 'models';

export class FoodRoutes extends BaseController {
	private _foodController: FoodController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'foodRoutes');

		this._foodController = new FoodController(args);

		this.__router.get('/', (req: Request, res: Response) => this._getAll(req, res));
		this.__router.post('/', (req: Request, res: Response) => this._set(req, res));

	}



	private _getAll = (req: Request, res: Response): void => {
		this._foodController.getFoods().then((foods: FoodModel[]) => {
			res.jsonp(foods);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _set = (req: Request, res: Response): void => {
		this._foodController.setFood(req.body).then((food: FoodModel) => {
			res.jsonp(food);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}
}
