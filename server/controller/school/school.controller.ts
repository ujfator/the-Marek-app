import { School } from '../../models';

import { SchoolSchema } from '../../schema/school.schema';
import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';

export class SchoolController extends BaseController {
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'schoolItems';
		this.modelName = 'schoolItem';
		this.schema = SchoolSchema;
	}
	
	/**
	 * Delete one School  object.
	 */
	public deleteItem(id: string): Promise<School> {
		return this.model.findByIdAndDelete(id).then((resp) => resp);
	}


	/**
	 * Get one School  object.
	 */
	public getItem(id: string): Promise<School> {
		return this.model.findById(id).then((resp) => new School(resp));
	}

	/**
	 * Get all Schools as School  objects.
	 */
	public getItems(): Promise<School[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new School(row));
		});
	}

	/**
	 * Add a new School to the Database by the given Data object list.
	 * It will return the added Schools passed to the School  object.
	 */
	public setItem(item: School): Promise<School> {
		return this.model.insertMany(item).then((resp) =>  new School(resp));
	}

	/**
	 * Patch School to the Database with the given Data.
	 * It will return the patched Schools passed to the School  object.
	 */
	public patchItem(item: School): Promise<School> {
		return this.model.findByIdAndUpdate(item.id, item).then((resp) => new School(resp));
	}
}
