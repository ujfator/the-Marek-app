import { Schema } from 'mongoose';

export const BudgetSchema = new Schema({
	name: { required: true, type: String },
    amount: { required: true, type: Number },
    maximum: { required: false, type: Number },
    nature: { required: true, type: String },
    author: { required: false, type: String }
});
