import { Food } from '../../models';

import { FoodSchema } from '../../schema/food.schema';
import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';

export class FoodController extends BaseController {
	
	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'foodItems';
		this.modelName = 'foodItem';
		this.schema = FoodSchema;
	}

	deleteFood(foodItemId: string): Promise<Food> {
		return this.model.findByIdAndDelete(foodItemId).then((resp) => resp);
	}

	getFood(foodItemId: string): Promise<Food> {
		return this.model.findById(foodItemId).then((resp) => new Food(resp));
	}

	getFoods(): Promise<Food[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new Food(row));
		});
	}

	setFood(foodItem: Food): Promise<Food> {
		return this.model.insertMany(foodItem).then((resp) =>  new Food(resp));
	}

	patchFood(foodItem: Food): Promise<Food> {
		return this.model.findByIdAndUpdate(foodItem.id, foodItem).then((resp) => new Food(resp));
	}
}
