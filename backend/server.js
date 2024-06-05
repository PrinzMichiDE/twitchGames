import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authService from './services/authService.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.post('/api/auth/twitch', authService);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
