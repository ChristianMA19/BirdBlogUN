import mongoose from 'mongoose';

const birdSchema = mongoose.Schema(
  {
    // campos
    Scientific: { type: String, required: [true] },
    English: { type: String, required: [true] },
    BLFamilyEnglish: { type: String, required: [true] },
    IOCOrder: { type: String, required: [true] },
  },
);

export default mongoose.model('bird', birdSchema);