const express = require('express');

const router = express.Router();
const Plataforma = require('../models/plataforma');

router.put('/GamerStore/api/plataforma/:id', (req, res, next) => {
  Plataforma.findOneAndUpdate( { _id : req.params.id },req.body,
    (err, doc, result) => {
      if (err) return res.status(500).send(err);
      return res.status(201).json(result);
    })
})

router.post('/GamerStore/api/plataforma', (req, res, next) => {
  const plataforma = new Plataforma({
    nombre: req.body.nombre
  });
  plataforma.save().then(result => {
    res.status(201).json(result);
  });
});

router.get('/GamerStore/api/plataformas',(req, res, next) => {
  Plataforma.find()
    .then(plataformas => {
      res.status(200).json(plataformas);
    });

});

router.delete('/GamerStore/api/plataforma/:id', (req, res, next) => {
  Plataforma.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post deleted!'})
  });
});

module.exports = router;
