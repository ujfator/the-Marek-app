import { Schema } from 'mongoose';

export const QualitySchema = new Schema({
	date: { required: true, type: Date },
    dayQuality: { required: true, type: String },
    wakeUp: { required: false, type: String },
    goToBed: { required: true, type: String},
    sleepTime: { required: true, type: String },
    mt: { required: false, type: String },
    excercise: { required: true, type: String},
    deepWorkTime: { required: true, type: String},
    author: { required: false, type: String }
});
