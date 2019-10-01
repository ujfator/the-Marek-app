import { FoodModel } from '../../models';

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
	 * Delete one Food Model object.
	 */
	public deleteFood(foodItemId: string): Promise<FoodModel> {
		return this.model.findByIdAndDelete(foodItemId).then((resp) => resp);
	}


	/**
	 * Get one Food Model object.
	 */
	public getFood(foodItemId: string): Promise<FoodModel> {
		return this.model.findById(foodItemId).then((resp) => new FoodModel(resp));
	}

	/**
	 * Get all Foods as Food Model objects.
	 */
	public getFoods(): Promise<FoodModel[]> {
		return this.model.find().then((resp) => {
			return resp.map((row) => new FoodModel(row));
		});
	}

	/**
	 * Add a new Food to the Database by the given Data object list.
	 * It will return the added Foods passed to the Food Model object.
	 */
	public setFood(foodItem: FoodModel): Promise<FoodModel> {
		return this.model.insertMany(foodItem).then((resp) =>  new FoodModel(resp));
	}

	/**
	 * Patch Food to the Database with the given Data.
	 * It will return the patched Foods passed to the Food Model object.
	 */
	public patchFood(foodItem: FoodModel): Promise<FoodModel> {
		return this.model.findByIdAndUpdate(foodItem.id, foodItem).then((resp) => new FoodModel(resp));
	}
}
