import mongoose from 'mongoose';

const apkSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  version: {
    type: String,
    default: '1.0.0'
  }
});

const APK = mongoose.model('APK', apkSchema);

export default APK;