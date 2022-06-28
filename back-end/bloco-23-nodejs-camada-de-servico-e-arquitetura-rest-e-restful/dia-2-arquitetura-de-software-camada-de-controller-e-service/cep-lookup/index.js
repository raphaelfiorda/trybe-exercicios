const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT;

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'pong' });
})

app.listen(PORT, () => console.log(`Servidor ouvindo a porta ${ PORT }`));