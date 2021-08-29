import { Schema } from 'mongoose';

export const DifficultySchema = new Schema({
	difficulty: { required: true, type: String },
});
