import { Base } from './base.model';

export class User extends Base {
	login: string = null;
	password: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
