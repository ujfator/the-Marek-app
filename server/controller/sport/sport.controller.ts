import { SportItemModel } from '../../models';

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
	public deleteSportItem(sportItemId: string): Promise<SportItemModel> {
		return this.model.findByIdAndDelete(sportItemId).then((resp) => resp);
	}


	/**
	 * Get one SportItem Model object.
	 */
	public getSportItem(sportItemId: string): Promise<SportItemModel> {
		return this.model.findById(sportItemId).then((resp) => new SportItemModel(resp));
	}

	/**
	 * Get all SportItems as SportItem Model objects.
	 */
	public getSportItems(): Promise<SportItemModel[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new SportItemModel(row));
		});
	}

	/**
	 * Add a new SportItem to the Database by the given Data object list.
	 * It will return the added SportItems passed to the SportItem Model object.
	 */
	public setSportItems(sportItems: SportItemModel[]): Promise<SportItemModel[]> {
		return this.model.insertMany(sportItems).then((resp) => {
			return resp.map((row) => new SportItemModel(row));
		});
	}

	/**
	 * Patch SportItem to the Database with the given Data.
	 * It will return the patched SportItems passed to the SportItem Model object.
	 */
	public patchSportItem(sportItem: SportItemModel): Promise<SportItemModel> {
		return this.model.findByIdAndUpdate(sportItem.id, sportItem).then((resp) => new SportItemModel(resp));
	}
}
