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

	deleteItem(id: string): Promise<Quality> {
		return this.model.findByIdAndDelete(id).then((resp) => resp);
	}

	getItem(id: string): Promise<Quality> {
		return this.model.findById(id).then((resp) => new Quality(resp));
	}

	getItems(): Promise<Quality[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new Quality(row));
		});
	}

	setItems(items: Quality[]): Promise<Quality[]> {
		return this.model.insertMany(items).then((resp) => {
			return resp.map((row) => new Quality(row));
		});
	}

	patchItem(item: Quality): Promise<Quality> {
		return this.model.findByIdAndUpdate(item.id, item).then((resp) => new Quality(resp));
	}
}
