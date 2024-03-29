import * as express from 'express';
import { BaseController, BaseInterface } from '../controller';
import {
	WorkflowRoutes,
	MoneyRoutes,
	BudgetRoutes,
	DifficultyRoutes,
	UserRoutes,
} from './';

export class Api extends BaseController {
	public get server(): express.Express {
		return this.__server;
	}

	constructor(args: BaseInterface) {
		super(args);

		this.__server.use(this.__router);
		console.warn('register API');

		this.__router.use('/workflow', this.__init(WorkflowRoutes, args).__router);
		this.__router.use('/money', this.__init(MoneyRoutes, args).__router);
		this.__router.use('/budget', this.__init(BudgetRoutes, args).__router);
		this.__router.use('/difficulty', this.__init(DifficultyRoutes, args).__router);
		this.__router.use('/users', this.__init(UserRoutes, args).__router);
	}
}
