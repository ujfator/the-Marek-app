
import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';
import { DifficultySchema } from '../../schema/difficulty.schema';
import { DifficultyModel } from '../../models';

export class DifficultyController extends BaseController {
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'difficulties';
		this.modelName = 'difficulty';
		this.schema = DifficultySchema;
	}

	/**
	 * Get all DifficultyItems as Difficulties Model objects.
	 */
	public getDifficulties(): Promise<[]> {
		return this.model.find().then((resp) => {
			{
				return resp.map((row) => new DifficultyModel(row));
			}
		});
	}

	/**
	 * Add a new DifficultyItem to the Database by the given Data object list.
	 * It will return the added DifficultyItems passed to the DifficultyItem Model object.
	 */
	public setDifficulty(items: string): Promise<string> {
		return this.model.insertMany(items).then((resp) => new DifficultyModel(resp));
	}
}
