import { Schema } from 'mongoose';

export const SportItemSchema = new Schema({
	date: { required: true, type: Date },
    sport: { required: true, type: String },
    difficulty: { required: true, type: String },
    duration: { required: true, type: Number},
    author: { required: false, type: String }
});
