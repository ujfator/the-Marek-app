import { Quality } from '../../models';

import { QualitySchema } from '../../schema/quality.schema';
import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';

export class QualityController extends BaseController {
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'qualities';
		this.modelName = 'quality';
		this.schema = QualitySchema;
	}
	
	/**
	 * Delete one Item  object.
	 */
	public deleteItem(id: string): Promise<Quality> {
		return this.model.findByIdAndDelete(id).then((resp) => resp);
	}


	/**
	 * Get one Item  object.
	 */
	public getItem(id: string): Promise<Quality> {
		return this.model.findById(id).then((resp) => new Quality(resp));
	}

	/**
	 * Get all Items as Item  objects.
	 */
	public getItems(): Promise<Quality[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new Quality(row));
		});
	}

	/**
	 * Add a new Item to the Database by the given Data object list.
	 * It will return the added Items passed to the Item  object.
	 */
	public setItems(items: Quality[]): Promise<Quality[]> {
		return this.model.insertMany(items).then((resp) => {
			return resp.map((row) => new Quality(row));
		});
	}

	/**
	 * Patch Item to the Database with the given Data.
	 * It will return the patched Items passed to the Item  object.
	 */
	public patchItem(item: Quality): Promise<Quality> {
		return this.model.findByIdAndUpdate(item.id, item).then((resp) => new Quality(resp));
	}
}
