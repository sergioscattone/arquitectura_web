const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    models.Persona.findAll()
        .then((rows) => {
            res.send(rows);
        });
});

router.get('/:id', (req, res) => {
    models.Persona.findOne({
        where : {
            id: req.params.id
        }
    }).then((row) => {
        if (row == null)
            //res.sendStatus(404);
            res.status(404).send('Persona no dada de alta.');
        else
            res.send(row);
    })
});

router.post('/', (req, res) => {

    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var edad = req.body.edad;

    models.Persona.create({
        apellido: apellido,
        nombre: nombre,
        edad: edad
    }).then(() => {
        res.sendStatus(201);
    });
});

module.exports = router;