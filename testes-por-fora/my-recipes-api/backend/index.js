import express from 'express';
import cors from 'cors';
import winston from 'winston';
import { promises as fs } from 'fs';
import recipesRouter from './routes/recipes.js';

const { readFile, writeFile } = fs;
global.fileName = 'recipes.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'recipes-api.log' }),
  ],
  format: combine(label({ label: 'recipes-api' }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', express.static('public'));
app.use('/recipes', recipesRouter);
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
app.listen(3000, startApi);

async function startApi() {
  try {
    await readFile(global.fileName);
    logger.info('API Started!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      recipes: [],
    };
    try {
      await writeFile(global.fileName, JSON.stringify(initialJson));
      logger.info('API Started and File Created!');
    } catch (err) {
      console.log({ err: err.message });
    }
  }
}
