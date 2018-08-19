const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})

app.post('/GamerStore/api/plataforma', (req, res, next) => {
  const plataforma = req.body;
  console.log(plataforma);
  res.status(201).json([]);
});

app.get('/GamerStore/api/plataformas',(req, res, next) => {
  const plataformas = [
    { id: 1, nombre: 'Playstation 1' },
    { id: 2, nombre: 'Playstation 2' },
    { id: 3, nombre: 'Playstation 3' }
  ];
  res.status(200).json(plataformas);
});

module.exports = app;
