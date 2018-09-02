const express = require('express');

const router = express.Router();
const Articulo = require('../models/articulo');

router.put('/GamerStore/api/articulo/:id', (req, res, next) => {
  Articulo.findOneAndUpdate( { _id : req.params.id },req.body,
    (err, doc, result) => {
      if (err) return res.status(500).send(err);
      return res.status(201).json(result);
    })
})

router.post('/GamerStore/api/articulo', (req, res, next) => {
  const articulo = new Articulo({
    juego_id: req.body.juego_id,
    plataforma_id: req.body.juego_id,
    formato: req.body.formato,
    cantidad: req.body.cantidad,
    precioAquiler: req.body.precioAquiler,
    precioVenta: req.body.precioVenta
  });
  articulo.save().then(result => {
    res.status(201).json(result);
  });
});

router.get('/GamerStore/api/articulos',(req, res, next) => {
  Articulo.find().then(articulos => {
      res.status(200).json(articulos);
    });

});

router.delete('/GamerStore/api/articulo/:id', (req, res, next) => {
  Articulo.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Articulo eliminado!'})
  });
});

module.exports = router;
