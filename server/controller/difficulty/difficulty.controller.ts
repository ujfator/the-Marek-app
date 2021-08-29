import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';
import { DifficultySchema } from '../../schema/difficulty.schema';
import { Difficulty } from '../../models';

export class DifficultyController extends BaseController {
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'difficulties';
		this.modelName = 'difficulty';
		this.schema = DifficultySchema;
	}

	getDifficulties(): Promise<[]> {
		return this.model.find().then((resp) => {
			{
				return resp.map((row) => new Difficulty(row));
			}
		});
	}

	setDifficulty(items: string): Promise<string> {
		return this.model.insertMany(items).then((resp) => new Difficulty(resp));
	}
}
