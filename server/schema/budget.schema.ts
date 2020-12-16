import { Schema } from 'mongoose';

export const BudgetSchema = new Schema({
	name: { required: true, type: String },
	amount: { required: true, type: Number },
	nature: { required: true, type: String },
	author: { required: false, type: String },
});
