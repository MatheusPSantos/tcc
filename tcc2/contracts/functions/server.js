const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

/**
 * Validando a origem da requisição.
 */
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:3333', 'http://example.com', 'https://example.com'];
  const origin = req.headers.origin;
  console.log(`ORIGEM: `, origin);

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  next();
});

app.get('/abi/:contratoNome', (req, res) => {
  const { contratoNome } = req.params;
  if (!contratoNome) res.status(404).send({ error: 'Informe um nome de contrato para pesquisarmos o ABI.' });

  fs.readFile(
    `../artifacts/contracts/${contratoNome}.sol/${contratoNome}.json`,
    'utf8',
    (err, data) => {
      if (err) {
        res.status(500).send({ error: 'Error reading file' });
      } else {
        const jsonParseado = JSON.parse(data);
        const abi = jsonParseado.abi;
        res.json({ abi });
      }
    });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

