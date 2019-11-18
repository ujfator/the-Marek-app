import { Base } from './base.model';

export class Money extends Base {
	public name: string = null;
	public price: number = null;
	public savings?: number = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}
