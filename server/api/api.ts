import * as express from 'express';
import { BaseController, BaseInterface } from '../controller';
import { WorkflowRoutes, MoneyRoutes, SportRoutes } from './';

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
		this.__router.use('/sport', this.__init(SportRoutes, args).__router);
	}
}
