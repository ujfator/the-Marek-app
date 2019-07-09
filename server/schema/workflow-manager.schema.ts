import { Schema } from 'mongoose';

export const WorkflowItemSchema = new Schema({
	title: { required: true, type: String },
  content: { required: false, type: String },
  container: { required: true, type: String },
});
