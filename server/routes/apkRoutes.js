import express from 'express';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import multer from 'multer';
import APK from '../models/apkModel.js';
import { Readable } from 'stream';

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload APK route
router.post('/upload', upload.single('apk'), async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'apks' });
    
    const uploadStream = bucket.openUploadStream(file.originalname);
    
    // Convert buffer to stream and pipe to GridFS
    const bufferStream = Readable.from(file.buffer);
    bufferStream.pipe(uploadStream);
    
    uploadStream.on('finish', async () => {
      // Create a reference in our APK collection
      const newApk = new APK({
        filename: file.originalname,
        contentType: file.mimetype,
        fileId: uploadStream.id,
        version: req.body.version || '1.0.0'
      });
      
      await newApk.save();
      res.status(201).json({ 
        message: 'APK uploaded successfully',
        apk: newApk
      });
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Download latest APK route
router.get('/download', async (req, res) => {
  try {
    // Get the latest APK file
    const latestApk = await APK.findOne().sort({ uploadDate: -1 });
    
    if (!latestApk) {
      return res.status(404).json({ message: 'No APK found' });
    }
    
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'apks' });
    
    res.set({
      'Content-Type': latestApk.contentType,
      'Content-Disposition': `attachment; filename="${latestApk.filename}"`
    });
    
    const downloadStream = bucket.openDownloadStream(latestApk.fileId);
    downloadStream.pipe(res);
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all APKs (for admin purposes)
router.get('/all', async (req, res) => {
  try {
    const apks = await APK.find().sort({ uploadDate: -1 });
    res.json(apks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;