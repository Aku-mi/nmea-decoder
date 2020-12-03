import mongoose, { Schema, model } from 'mongoose';

export interface Secuence extends mongoose.Document {
    secuence: String,
    lat: Number,
    lon: Number,
    date: Date
}

const NMEASchema = new Schema({
    secuence: String,
    lat: Number,
    lon: Number,
    date: Date
});

export default model<Secuence>('Secuence', NMEASchema);