import { Schema } from 'mongoose';

export const MoneySchema = new Schema({
	name: { required: true, type: String },
    price: { required: true, type: Number },
    savings: { required: false, type: Number }
});
