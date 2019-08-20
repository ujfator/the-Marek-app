import * as express from 'express';
import { Connection, Document, Model, Schema } from 'mongoose';

import { BaseInterface } from './base.interface';
import { DbiController } from './dbi/dbi.controller';

export class BaseController {

	protected get __dbi(): DbiController {
		return this._dbi;
	}
	protected get __dbh(): Connection {
		return this._dbi.dbh;
	}
	protected get __server(): express.Express {
		return this._server;
	}
	protected get __router(): express.Router {
		return this._router;
	}

	/**
	 * Get the model handler.
	 * If there is no existing handler it will create a new handler.
	 */
	
	public get model(): Model<Document> {
		if (!this._model && this.__dbh && this.modelName && this.schema && this.collection) {
			this._model = this.__dbh.model<Document>(this.modelName, this.schema, this.collection);
		}

		return this._model;
	}

	public collection: string;
	public modelName: string;
	public schema: Schema;

	protected readonly __args: any;

	private readonly _server: express.Express;
	private readonly _router: express.Router;
	private readonly _dbi: DbiController;
	private _model: Model<Document>;

	constructor(args: BaseInterface) {
		this.__args = args;
		this._server = args.server || express();
		this._router = express.Router(args.options);
		this._dbi = args.dbi || new DbiController();
	}

	protected __init(route: any, options: any): any {
		return new route({
			dbi: this.__dbi,
			options,
			router: this.__router,
			server: this.__server
		});
	}
}
