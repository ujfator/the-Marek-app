import { Base } from './base.model';

export class Quality extends Base {
	date: Date = null;
	dayQuality: number = null;
	wakeUp: string = null;
	goToBed: string = null;
	sleepTime: number = null;
	excercise: boolean = null;
	deepWorkTime: string = null;
	meaningfulActivity: string = null;
	author: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}

