const ChallengeModel = require('../models/challenge');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    ChallengeModel
        .find()
        .then(doc => {
            res.json(doc);
        });
});

router.get('/:id', (req, res) => {
    ChallengeModel
        .findById(req.params.id)
        .then(doc => {
            if (row == null)
                res.status(404).send('No match');
            else
                res.json(row.points);
        });
});

router.post('/', (req, res) => {
    // create challenge
});

module.exports = router;