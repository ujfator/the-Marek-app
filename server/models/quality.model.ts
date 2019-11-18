import { Base } from './base.model';

export class Quality extends Base {
	public date: Date = null;
	public dayQuality: number = null;
	public wakeUp: string = null;
	public goToBed: string = null;
	public sleepTime: number = null;
	public mt: boolean = null;
	public excercise: boolean = null;
	public deepWorkTime: string = null;
	public author: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}

