import mongoose, { Schema, model } from 'mongoose';


export interface Admin extends mongoose.Document {
    user: String,
    pass: String,
}

const adminSchema = new Schema({
    user: String,
    pass: String,
});

export default model<Admin>('Admin', adminSchema);