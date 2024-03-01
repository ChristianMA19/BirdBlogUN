import { Int32, ObjectId } from 'mongodb';

import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    // campos
    author: { type: String},
    date: { type: Date, default: Date.now},
    location: { type: String, required: [true] },
    scientificName: { type: String, required: [true] },
    commonName: { type: String, required: [true] },
    family: { type: String, required: [true] },
    order: { type: String, required: [true] },
    description: { type: String, required: [true] },
    inDanger: { type: Number, default: false},
    urlPhoto: { type: String, required: [true] },
    reportsCount: { type: Number, default: 0},
    isDisable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Posts', postSchema);