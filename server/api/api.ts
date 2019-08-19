import * as express from 'express';
import { BaseController, BaseInterface } from '../controller';
import { WorkflowManagerRoutes, MoneyManagerRoutes } from './';

const BASE_ROUTE: string = '/v1';

export class Api extends BaseController {
	public get server(): express.Express {
		return this.__server;
	}

	constructor(args: BaseInterface) {
		super(args);

		this.__server.use(BASE_ROUTE, this.__router);

		console.warn('register API V1');

		this.__router.use('/workflowManager', this.__init(WorkflowManagerRoutes, args).__router);
		this.__router.use('/moneyManager', this.__init(MoneyManagerRoutes, args).__router);
	}
}
