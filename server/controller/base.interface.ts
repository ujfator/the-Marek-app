import * as express from 'express';

export interface BaseInterface {
	server?: express.Express;
	router?: express.Router;
	dbi?: any;
	options?: any;
}
