import { Schema } from 'mongoose';

export const SchoolSchema = new Schema({
	date: { required: true, type: Date },
	subject: { required: false, type: String },
	difficulty: { required: false, type: String },
	typeOfTest: { required: false, type: String },
	author: { required: false, type: String },
});
