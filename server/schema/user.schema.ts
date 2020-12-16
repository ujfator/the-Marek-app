import { Schema } from 'mongoose';

export const UserSchema = new Schema({
	login: { required: true, type: String },
	password: { required: true, type: String },
});
