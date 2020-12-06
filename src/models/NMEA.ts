import mongoose, { Schema, model } from 'mongoose';

export interface Secuence extends mongoose.Document {
    secuence: String,
    lat: Number,
    lon: Number,
    date: Date
}

const NMEASchema = new Schema({
    secuence: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default model<Secuence>('Secuence', NMEASchema);