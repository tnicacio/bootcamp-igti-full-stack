import { AccountModel as Account } from '../models/AccountModel.js';
import * as Constants from '../helpers/Constants.js';

const alreadyExists = async (agencia, conta) => {
  const found = await Account.findOne({ agencia, conta });
  return found !== null;
};

export async function newAccount(req, res) {
  try {
    const { agencia, conta, name, balance } = req.body;

    if (
      !agencia ||
      !conta ||
      !name ||
      !balance ||
      (await alreadyExists(Number(agencia), Number(conta)))
    ) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }
    const newAccount = { agencia, conta, name, balance };
    const inserted = await Account.insertMany(newAccount);
    if (!inserted) {
      return res.status(400).json({ error: 'Error on new account insertion' });
    }
    return res.status(200).json(inserted[0]._doc);
  } catch (e) {
    return console.log({ error: e });
  }
}

/*
Crie um endpoint para registrar um depósito em uma conta. Este endpoint deverá
receber como parâmetros a “agencia”, o número da “conta” e o valor do depósito.
Ele deverá atualizar o “balance” da conta, incrementando-o com o valor recebido
como parâmetro. O endpoint deverá validar se a conta informada existe, caso não
exista deverá retornar um erro, caso exista retornar o saldo atual da conta.
*/
export async function deposit(req, res) {
  return await transactions(req, res, Constants.DEPOSIT);
}

/*
Crie um endpoint para registrar um saque em uma conta. Este endpoint deverá
receber como parâmetros a “agência”, o número da “conta” e o valor do saque. Ele
deverá atualizar o “balance” da conta, decrementando-o com o valor recebido com
parâmetro e cobrando uma tarifa de saque de (1). O endpoint deverá validar se a
conta informada existe, caso não exista deverá retornar um erro, caso exista retornar
o saldo atual da conta. Também deverá validar se a conta possui saldo suficiente
para aquele saque, se não tiver deverá retornar um erro, não permitindo assim que
o saque fique negativo.
*/
export async function withdraw(req, res) {
  return await transactions(req, res, Constants.WITHDRAW);
}

async function transactions(req, res, operation) {
  try {
    const { agencia, conta, value } = req.body;

    if (!agencia || !conta || !balance) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    const findAccount = await Account.findOne({ agencia, conta });
    if (!findAccount) {
      return res.status(400).json({ error: 'Agency or Account not found' });
    }

    switch (operation) {
      case Constants.DEPOSIT:
        findAccount.balance += value;
        break;

      case Constants.WITHDRAW:
        const newBalance = findAccount.balance - value - 1;
        if (newBalance < 0) {
          return res.status(400).json({ error: 'Insuficient balance' });
        }
        findAccount.balance = newBalance;
        break;
    }

    await findAccount.save();
    return res.status(200).json(findAccount);
  } catch (e) {
    console.log({ error: e });
  }
}

/*
Crie um endpoint para consultar o saldo da conta. Este endpoint deverá receber
como parâmetro a “agência” e o número da “conta”, e deverá retornar seu “balance”.
Caso a conta informada não exista, retornar um erro
*/
export async function balance(req, res) {
  try {
    const { agencia, conta } = req.query;

    if (!agencia || !conta) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    const findAccount = await Account.findOne({ agencia, conta });
    if (!findAccount) {
      return res.status(400).json({ error: 'Agency or Account not found' });
    }

    return res.status(200).json(findAccount);
  } catch (e) {
    console.log({ error: e });
  }
}

/*
Crie um endpoint para excluir uma conta. Este endpoint deverá receber como
parâmetro a “agência” e o número da “conta” da conta e retornar o número de contas
ativas para esta agência.
*/
export async function deleteAccount(req, res) {
  try {
    const { agencia, conta } = req.body;

    if (!agencia || !conta) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    await Account.findOneAndDelete({ agencia, conta });
    const activeAccounts = await Account.find({ agencia });

    return res.status(200).json(activeAccounts);
  } catch (e) {
    console.log({ error: e });
  }
}

/*
Crie um endpoint para realizar transferências entre contas. Este endpoint deverá
receber como parâmetro o número da “conta” origem, o número da “conta” destino e
o valor de transferência. Este endpoint deve validar se as contas são da mesma
agência para realizar a transferência, caso seja de agências distintas o valor de tarifa
de transferencia (8) deve ser debitado na “conta” origem. O endpoint deverá retornar
o saldo da conta origem.
*/
export async function transfer(req, res) {
  try {
    const { fromAcc, toAcc, value } = req.body;

    if (!fromAcc || !toAcc || !value) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }
    const findFromAcc = await Account.findOne({ conta: fromAcc });
    const findToAcc = await Account.findOne({ conta: toAcc });

    if (!findFromAcc || !findToAcc) {
      return res
        .status(400)
        .json({ error: 'Origin or Destination Accounts not found' });
    }

    if (findFromAcc.agencia !== findToAcc.agencia) {
      findFromAcc.balance -= 8;
    }

    findFromAcc.balance -= value;
    findToAcc.balance += value;

    await findFromAcc.save();
    await findToAcc.save();

    return res.status(200).json(findFromAcc);
  } catch (e) {
    console.log({ error: e });
  }
}

/*
Crie um endpoint para consultar a média do saldo dos clientes de determinada
agência. O endpoint deverá receber como parametro a “agência” e deverá retornar
o balance médio da conta.
*/
export async function avgByAgency(req, res) {
  const { agencia } = req.query;

  if (!agencia) {
    return res.status(400).json({ error: 'Parâmetros inválidos' });
  }

  const averageBalanceByAgency = await Account.aggregate([
    { $match: { agencia: Number(agencia) } },
    { $group: { _id: '$agencia', avgBalance: { $avg: '$balance' } } },
  ]);

  if (averageBalanceByAgency.length === 0) {
    return res.status(200).json({ msg: 'No accounts found' });
  }

  return res.status(200).json(averageBalanceByAgency);
}

/*
Crie um endpoint para consultar os clientes com o menor saldo em conta. O endpoint
devera receber como parâmetro um valor numérico para determinar a quantidade de
clientes a serem listados, e o endpoint deverá retornar em ordem crescente pelo
saldo a lista dos clientes (agência, conta, saldo).
*/
export async function bottomBalances(req, res) {
  await getTopOrBottomBalances(req, res, Constants.BOTTOM);
}

/*
Crie um endpoint para consultar os clientes mais ricos do banco. O endpoint deverá
receber como parâmetro um valor numérico para determinar a quantidade de clientes
a serem listados, e o endpoint deverá retornar em ordem decrescente pelo saldo,
crescente pelo nome, a lista dos clientes (agência, conta, nome e saldo).
*/
export async function topBalances(req, res) {
  await getTopOrBottomBalances(req, res, Constants.TOP);
}

async function getTopOrBottomBalances(req, res, option) {
  const { limit } = req.query;

  if (!limit || limit <= 0) {
    return res.status(400).json({ error: 'Parâmetros inválidos' });
  }

  let order = 0;
  if (option === Constants.TOP) {
    order = -1;
  } else if (option === Constants.BOTTOM) {
    order = 1;
  }

  const findAccounts = await Account.aggregate([
    { $sort: { balance: order } },
  ]).limit(Number(limit));

  return res.status(200).json(findAccounts);
}

/*
Crie um endpoint que irá transferir o cliente com maior saldo em conta de cada
agência para a agência private agencia=99. O endpoint deverá retornar a lista dos
clientes da agencia private.
*/
export async function transferToPrivateAccount(_req, res) {
  const findAgencies = await Account.distinct('agencia');
  let vipAccounts = [];

  for (const agency of findAgencies) {
    const findTopAccount = await Account.find({ agencia: agency })
      .sort({ balance: -1 })
      .limit(1);

    const { name, balance, conta } = findTopAccount[0];

    const accountAlreadyExists = alreadyExists(99, Number(conta));

    if (!accountAlreadyExists) {
      vipAccounts.push({
        agencia: 99,
        name,
        balance,
        conta,
      });
    }
  }

  if (vipAccounts.length > 0) {
    await Account.insertMany(vipAccounts);
  }

  const findPrivateAgency = await Account.find({ agencia: 99 });
  return res.status(200).json(findPrivateAgency);
}
