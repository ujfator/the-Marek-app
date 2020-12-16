import { Schema } from 'mongoose';

export const FoodSchema = new Schema({
	date: { required: true, type: Date },
	breakfast: { required: false, type: String },
	lunch: { required: false, type: String },
	dinner: { required: false, type: String },
	junkFood: { required: false, type: String },
	author: { required: false, type: String },
});
