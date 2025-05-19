import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import apkRoutes from './routes/apkRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/apk', apkRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// For HTTP
app.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});

// For HTTPS - uncomment once you have certificates
// const privateKey = fs.readFileSync('/path/to/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/path/to/cert.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate };
// 
// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(443, () => {
//   console.log('HTTPS Server running on port 443');
// });