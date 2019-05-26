const ResponseModel = require('../models/response');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    ResponseModel
        .find()
        .then(doc => {
            res.json(doc);
        });
});

router.get('/:id', (req, res) => {
    ResponseModel
        .findById(req.params.id)
        .then(doc => {
            if (row == null)
                res.status(404).send('No match');
            else
                res.json(row.points);
        });
});

router.post('/', (req, res) => {
    // update points
});

module.exports = router;