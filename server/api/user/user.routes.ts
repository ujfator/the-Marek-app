import { Request, Response } from 'express-serve-static-core';
import { UserController, BaseController, BaseInterface } from '../../controller';
import { User } from 'models/user.model';
import * as bcrypt from 'bcrypt';

export class UserRoutes extends BaseController {
	private _userController: UserController;

	constructor(args: BaseInterface) {
		super(args);
		console.warn('register route', 'userRoutes');

		this._userController = new UserController(args);

		this.__router.get('/', (req: Request, res: Response) => this._getUsers(req, res));
		this.__router.post('/login', (req: Request, res: Response) => this._login(req, res));
		this.__router.post('/', (req: Request, res: Response) => this._setUser(req, res));
		this.__router.get('/:data', (req: Request, res: Response) => this._getUser(req, res));
	}

	private _login = (req: Request, res: Response): void => {
		this._userController.login(req.body).then((isValid: boolean): void => {
			res.json(isValid)
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}

	private _setUser = (req: Request, res: Response): void => {
		this._userController.setUser(req.body).then((res: string): string => {
			return res;
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
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
		this._userController.getUser(req.params.data).then((isValid: boolean) => {
			res.jsonp(isValid);
		}).catch((e: any) => {
			res.status(500).send(e);
			console.warn(e);
		});
	}
}
