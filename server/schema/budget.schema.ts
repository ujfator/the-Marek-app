import { Schema } from 'mongoose';

export const BudgetItemSchema = new Schema({
	name: { required: true, type: String },
    amount: { required: true, type: Number },
    nature: { required: true, type: String }
});
