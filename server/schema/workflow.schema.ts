import { Schema } from 'mongoose';

export const WorkflowSchema = new Schema({
	name: { required: true, type: String },
	content: { required: false, type: String },
	container: { required: true, type: String },
	author: { required: false, type: String },
	finished: { required: false, type: Date},
	difficulty: { required: false, type: String}
});
