import { Schema } from 'mongoose';

export const FoodSchema = new Schema({
	date: { required: true, type: Date },
	firstFood: { required: false, type: String },
	lastFood: { required: false, type: String },
	author: { required: false, type: String },
});
