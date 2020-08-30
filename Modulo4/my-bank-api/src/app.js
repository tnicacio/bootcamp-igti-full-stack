import express from 'express';
import mongoose from 'mongoose';
import { AccountRouter } from '../src/routes/AccountRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(AccountRouter);
app.listen(3000, () => {
  console.log('Server started: http://localhost:3000');
});
