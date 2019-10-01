import { BaseModel } from './base.model';

export class FoodModel extends BaseModel {
    public date: Date = null;
    public breakfast: string = null;
    public lunch: string = null;
    public dinner: string = null;
    public junkFood: string = null;
    public author: string = null;

	constructor(args: any) {
		super();
		this.__init(args);
	}
}