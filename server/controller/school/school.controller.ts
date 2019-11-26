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

	deleteItem(id: string): Promise<School> {
		return this.model.findByIdAndDelete(id).then((resp) => resp);
	}

	getItem(id: string): Promise<School> {
		return this.model.findById(id).then((resp) => new School(resp));
	}

	getItems(): Promise<School[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new School(row));
		});
	}

	setItem(item: School): Promise<School> {
		return this.model.insertMany(item).then((resp) =>  new School(resp));
	}

	patchItem(item: School): Promise<School> {
		return this.model.findByIdAndUpdate(item.id, item).then((resp) => new School(resp));
	}
}
