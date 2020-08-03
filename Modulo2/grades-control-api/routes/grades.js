import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
const router = express.Router();

function validateGradeRequest(student, subject, type, value, id) {
  switch (arguments.length) {
    case 4:
      if (!student || !subject || !type || value == null) {
        throw new Error('student, subject, type and value são obrigatórios.');
      }
      return true;
    case 5:
      if (!id || !student || !subject || !type || value == null) {
        throw new Error(
          'id, student, subject, type and value são obrigatórios.'
        );
      }
      return true;
    default:
      throw new Error('campos obrigatórios não definidos.');
  }
}

/*
1. Crie um endpoint para criar uma grade. Este endpoint deverá receber como
parâmetros os campos student, subject, type e value conforme descritos acima. 
Esta grade deverá ser salva no arquivo json grades.json, e deverá ter um id 
único associado. No campo timestamp deverá ser salvo a data e hora do momento 
da inserção. O endpoint deverá retornar o objeto da grade que foi criada. 
A API deverá garantir o incremento automático deste identificador, de forma que 
ele não se repita entre os registros. Dentro do arquivo grades.json que foi 
fornecido para utilização no desafio o campo nextId já está com um valor 
definido. Após a inserção é preciso que esse nextId seja incrementado e salvo 
no próprio arquivo, de forma que na próxima inserção ele possa ser utilizado.
*/
router.post('/', async (req, res, next) => {
  try {
    let grade = req.body;

    const { student, subject, type, value } = grade;
    validateGradeRequest(student, subject, type, value);

    const data = JSON.parse(await readFile(global.fileName));
    grade = {
      id: data.nextId++,
      student: student,
      subject: subject,
      type: type,
      value: value,
      timestamp: new Date(),
    };

    data.grades.push(grade);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(grade);
    logger.info(`POST /grade - ${JSON.stringify(grade)}`);
  } catch (err) {
    next(err);
  }
});

/*
2. Crie um endpoint para atualizar uma grade. Este endpoint deverá receber 
como parâmetros o id da grade a ser alterada e os campos student, subject, 
type e value. O endpoint deverá validar se a grade informada existe, caso não
exista deverá retornar um erro. Caso exista, o endpoint deverá atualizar as 
informações recebidas por parâmetros no registro, e realizar sua atualização 
com os novos dados alterados no arquivo grades.json.
*/
router.put('/', async (req, res, next) => {
  try {
    const grade = req.body;

    const { id, student, subject, type, value } = grade;
    validateGradeRequest(student, subject, type, value, id);

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex((i) => i.id === grade.id);

    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }

    data.grades[index].student = student;
    data.grades[index].subject = subject;
    data.grades[index].type = type;
    data.grades[index].value = value;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.grades[index]);

    logger.info(`PUT /grade - ${JSON.stringify(data.grades[index])}`);
  } catch (err) {
    next(err);
  }
});

/*
3. Crie um endpoint para excluir uma grade. Este endpoint deverá receber como
 parâmetro o id da grade e realizar sua exclusão do arquivo grades.json.
*/
router.delete('/id/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
    logger.info(`DELETE /grade/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

/*
4. Crie um endpoint para consultar uma grade em específico. Este endpoint 
deverá receber como parâmetro o id da grade e retornar suas informações.
*/
router.get('/id/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );
    res.send(grade);
    logger.info(`GET /id/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

//5
// router.get('/notaTotal?', async (req, res, next) => {
//   try {
//     res.send(req.query);
//   } catch (err) {
//     next(err);
//   }
// });

/*
5. Crie um endpoint para consultar a nota total de um aluno em uma disciplina.
O endpoint deverá receber como parâmetro o student e o subject, e realizar a 
soma de todas os as notas de atividades correspondentes a aquele subject para 
aquele student. O endpoint deverá retornar a soma da propriedade value dos 
registros encontrados.
*/
router.get('/notaTotal/:student/:subject', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const { student, subject } = req.params;

    let filteredData = data.grades.filter((grade) => {
      return grade.student === student && grade.subject === subject;
    });

    if (filteredData.length === 0) {
      throw new Error('student ou subject não encontrado.');
    }

    filteredData = filteredData.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    filteredData = { notaTotal: filteredData };
    res.send(filteredData);
    logger.info(`GET /notaTotal/:student/:subject - ${filteredData.notaTotal}`);
  } catch (err) {
    next(err);
  }
});

/*
6. Crie um endpoint para consultar a média das grades de determinado subject e
type. O endpoint deverá receber como parâmetro um subject e um type, e
retornar a média. A média é calculada somando o registro value de todos os 
registros que possuem o subject e type informados, e dividindo pelo total 
de registros que possuem este mesmo subject e type.
*/
router.get('/media/:subject/:type', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const { subject, type } = req.params;

    let filteredData = data.grades.filter((grade) => {
      return grade.subject === subject && grade.type === type;
    });

    const resultLength = filteredData.length;
    if (resultLength === 0) {
      throw new Error('subject ou type não encontrado.');
    }

    filteredData = filteredData.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    filteredData = { media: filteredData / resultLength };

    res.send(filteredData);
    logger.info(`GET /media/:subject/:type - ${filteredData}`);
  } catch (err) {
    next(err);
  }
});

/*
7. Crie um endpoint para retornar as três melhores grades de acordo com 
determinado subject e type. O endpoint deve receber como parâmetro um subject e 
um type retornar um array com os três registros de maior value daquele subject 
e type. A ordem deve ser do maior para o menor.
*/
router.get('/top(:top)?/:subject/:type', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const { top, subject, type } = req.params;

    let filteredData = data.grades.filter((grade) => {
      return grade.subject === subject && grade.type === type;
    });

    const numResults = filteredData.length;
    if (numResults === 0) {
      throw new Error('subject ou type não encontrado.');
    }

    const topo = top ? Math.min(parseInt(top), numResults) : numResults;

    filteredData = filteredData.sort((a, b) => {
      return b.value - a.value;
    });

    let retorno = { top: [] };
    for (let i = 0; i < topo; i++) {
      retorno.top.push(filteredData[i]);
    }
    res.send(retorno);
    logger.info(`GET /top:top/:subject/:type - ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
});

router.get('/all', async (_req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
    logger.info('GET /grades/all');
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
