const express = require('express');

const router = express.Router();
const Cliente = require('../models/cliente');

router.put('/GamerStore/api/cliente/:id', (req, res, next) => {
  Cliente.findOneAndUpdate( { _id : req.params.id },req.body,
    (err, doc, result) => {
      if (err) return res.status(500).send(err);
      return res.status(201).json(result);
    })
})

router.post('/GamerStore/api/cliente', (req, res, next) => {
  const cliente = new Cliente({
    dni: req.body.dni,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    codPostal: req.body.codPostal,
    poblacion: req.body.poblacion,
    provincia: req.body.provincia
  });
  cliente.save().then(result => {
    res.status(201).json(result);
  });
});

router.get('/GamerStore/api/clientes',(req, res, next) => {
  Cliente.find().then( clientes => {
      res.status(200).json(clientes);
    });
});

router.delete('/GamerStore/api/cliente/:id', (req, res, next) => {
  Cliente.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Cliente eliminado!'})
  });
});

module.exports = router;
