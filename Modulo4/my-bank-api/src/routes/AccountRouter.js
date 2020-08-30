import express from 'express';
import * as AccountController from '../controllers/AccountController.js';

const AccountRouter = express.Router();

AccountRouter.post('/createAcc', AccountController.newAccount);

AccountRouter.post('/deposit', AccountController.deposit);
AccountRouter.post('/withdraw', AccountController.withdraw);
AccountRouter.get('/balance', AccountController.balance);
AccountRouter.delete('/remove', AccountController.deleteAccount);
AccountRouter.post('/transfer', AccountController.transfer);
AccountRouter.get('/avg', AccountController.avgByAgency);
AccountRouter.get('/bottom', AccountController.bottomBalances);
AccountRouter.get('/top', AccountController.topBalances);
AccountRouter.get('/transferTop', AccountController.transferToPrivateAccount);

export { AccountRouter };
