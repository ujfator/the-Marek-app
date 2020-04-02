import * as express from 'express';
import { BaseController, BaseInterface } from '../controller';
import { WorkflowRoutes, MoneyRoutes, QualityRoutes, BudgetRoutes, DifficultyRoutes, FoodRoutes, UserRoutes } from './';
import { SchoolRoutes } from './school/school.routes';

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
		this.__router.use('/quality', this.__init(QualityRoutes, args).__router);
		this.__router.use('/difficulty', this.__init(DifficultyRoutes, args).__router);
		this.__router.use('/food', this.__init(FoodRoutes, args).__router);
		this.__router.use('/school', this.__init(SchoolRoutes, args).__router);
		this.__router.use('/users', this.__init(UserRoutes, args).__router);
	}
}
