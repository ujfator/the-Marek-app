import { SportModel } from '../../models';

import { SportItemSchema } from '../../schema/sport.schema';
import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';

export class SportController extends BaseController {
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'sportItems';
		this.modelName = 'sportItem';
		this.schema = SportItemSchema;
	}
	
	/**
	 * Delete one SportItem Model object.
	 */
	public deleteSportItem(sportItemId: string): Promise<SportModel> {
		return this.model.findByIdAndDelete(sportItemId).then((resp) => resp);
	}


	/**
	 * Get one SportItem Model object.
	 */
	public getSportItem(sportItemId: string): Promise<SportModel> {
		return this.model.findById(sportItemId).then((resp) => new SportModel(resp));
	}

	/**
	 * Get all SportItems as SportItem Model objects.
	 */
	public getSportItems(): Promise<SportModel[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new SportModel(row));
		});
	}

	/**
	 * Add a new SportItem to the Database by the given Data object list.
	 * It will return the added SportItems passed to the SportItem Model object.
	 */
	public setSportItems(sportItems: SportModel[]): Promise<SportModel[]> {
		return this.model.insertMany(sportItems).then((resp) => {
			return resp.map((row) => new SportModel(row));
		});
	}

	/**
	 * Patch SportItem to the Database with the given Data.
	 * It will return the patched SportItems passed to the SportItem Model object.
	 */
	public patchSportItem(sportItem: SportModel): Promise<SportModel> {
		return this.model.findByIdAndUpdate(sportItem.id, sportItem).then((resp) => new SportModel(resp));
	}
}
