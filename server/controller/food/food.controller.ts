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
	
	/**
	 * Delete one Food  object.
	 */
	public deleteFood(foodItemId: string): Promise<Food> {
		return this.model.findByIdAndDelete(foodItemId).then((resp) => resp);
	}


	/**
	 * Get one Food  object.
	 */
	public getFood(foodItemId: string): Promise<Food> {
		return this.model.findById(foodItemId).then((resp) => new Food(resp));
	}

	/**
	 * Get all Foods as Food  objects.
	 */
	public getFoods(): Promise<Food[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new Food(row));
		});
	}

	/**
	 * Add a new Food to the Database by the given Data object list.
	 * It will return the added Foods passed to the Food  object.
	 */
	public setFood(foodItem: Food): Promise<Food> {
		return this.model.insertMany(foodItem).then((resp) =>  new Food(resp));
	}

	/**
	 * Patch Food to the Database with the given Data.
	 * It will return the patched Foods passed to the Food  object.
	 */
	public patchFood(foodItem: Food): Promise<Food> {
		return this.model.findByIdAndUpdate(foodItem.id, foodItem).then((resp) => new Food(resp));
	}
}
