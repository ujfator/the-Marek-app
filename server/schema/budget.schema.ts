import { Schema } from 'mongoose';

export const BudgetItemSchema = new Schema({
	name: { required: true, type: String },
    price: { required: true, type: Number }
});
