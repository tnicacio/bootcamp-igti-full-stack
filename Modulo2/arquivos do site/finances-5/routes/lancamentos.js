import express from 'express';
import {
  inserirLancamento,
  totalMes,
} from '../controllers/lancamentosController.js';

const router = express.Router();

router.post('/receita', async (req, res) => {
  try {
    res.send(await inserirLancamento(req.body));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/despesa', async (req, res) => {
  try {
    res.send(await inserirLancamento(req.body, 'D'));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/totalMes/:mes', async (req, res) => {
  try {
    res.send(await totalMes(parseInt(req.params.mes)));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
