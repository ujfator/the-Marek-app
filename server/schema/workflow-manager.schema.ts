import { Schema } from 'mongoose';

export const WorkflowItemSchema = new Schema({
	name: { required: true, type: String },
  content: { required: false, type: String },
  container: { required: true, type: String },
});
