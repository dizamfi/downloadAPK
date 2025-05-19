import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import apkRoutes from './routes/apkRoutes.js';

// Get the directory name correctly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Define port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/apk', apkRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// // HTTP server for development
// app.listen(PORT, () => {
//   console.log(`HTTP Server running on port ${PORT}`);
// });

// Read SSL certificates
try {
  const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.cert')),
  };

  // Create HTTPS server
  const HTTPS_PORT = 6060;
  https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
  });
} catch (error) {
  console.log('SSL certificates not found, HTTPS server not started:', error.message);
}