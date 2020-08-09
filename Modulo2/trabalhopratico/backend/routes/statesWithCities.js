import express from 'express';
import {
  getTop5,
  getBottom5,
  getCitiesOf,
} from '../controllers/statesController.js';

const router = express.Router();

router.get('/cities/:UF/', async (req, res) => {
  res.send(await getCitiesOf(req.params.UF));
});

router.get('/top5', async (_req, res) => {
  res.send(await getTop5());
});

router.get('/bottom5', async (req, res) => {
  res.send(await getBottom5());
});

router.all('/testeAll', async (req, res) => {
  res.send(req.method);
});

router.get('/teste?', async (req, res) => {
  res.send('/teste?');
});

export default router;
