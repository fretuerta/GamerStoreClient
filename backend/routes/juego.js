const express = require('express');

const router = express.Router();
const Juego = require('../models/juego');

router.put('/GamerStore/api/juego/:id', (req, res, next) => {
  Juego.findOneAndUpdate( { _id : req.params.id },req.body,
    (err, doc, result) => {
      if (err) return res.status(500).send(err);
      return res.status(201).json(result);
    })
})

router.post('/GamerStore/api/juego', (req, res, next) => {
  const juego = new Juego({
    nombre: req.body.nombre,
    codigo: req.body.codigo
  });
  juego.save().then(result => {
    res.status(201).json(result);
  });
});

router.get('/GamerStore/api/juegos',(req, res, next) => {
  Juego.find().then( juegos => {
      res.status(200).json(juegos);
    });

});

router.delete('/GamerStore/api/juego/:id', (req, res, next) => {
  Juego.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Juego eliminado!'})
  });
});

module.exports = router;
