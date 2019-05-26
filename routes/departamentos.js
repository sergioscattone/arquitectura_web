const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    models.Departamento.findAll({
        include: [ models.Persona ]
    }).then((rows) => {
            res.send(rows);
        });
});

router.get('/:id', (req, res) => {
    models.Departamento.findOne({
        where : {
            id: req.params.id
        }
    }).then((row) => {
        if (row == null)
            //res.sendStatus(404);
            res.status(404).send('Departamento no dada de alta.');
        else
            res.send(row);
    })
});

router.post('/', (req, res) => {

    var nombre = req.body.nombre;

    models.Departamento.create({
        nombre: nombre
    }).then(() => {
        res.sendStatus(201);
    });
});

module.exports = router;