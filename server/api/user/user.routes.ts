import { Request, Response } from 'express-serve-static-core';
import { UserController, BaseController, BaseInterface } from '../../controller';
import { User } from 'models/user.model';

export class UserRoutes extends BaseController {
	private _userController: UserController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'userRoutes');

		this._userController = new UserController(args);

		this.__router.get('/', (req: Request, res: Response) => this._getUsers(req, res));
		this.__router.get('/:password', (req: Request, res: Response) => this._getUser(req, res));
	}

	private _getUsers = (req: Request, res: Response): void => {
		this._userController.getUsers().then((users: User[]) => {
			res.jsonp(users);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _getUser = (req: Request, res: Response): void => {
		this._userController.getUser(req.params.password).then((user: User) => {
			res.jsonp(user);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}
}
