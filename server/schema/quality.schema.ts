import { Schema } from 'mongoose';

export const QualitySchema = new Schema({
	date: { required: false, type: Date },
    dayQuality: { required: false, type: String },
    wakeUp: { required: false, type: String },
    goToBed: { required: false, type: String},
    sleepTime: { required: false, type: String },
    mt: { required: false, type: String },
    excercise: { required: false, type: String},
    deepWorkTime: { required: false, type: String},
    meaningfulActivity: { required: false, type: String},
    author: { required: false, type: String }
});
