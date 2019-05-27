const models  = require('../models/index');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
    models.challengeModel
        .find()
        .then(doc => {
            res.json(doc);
        });
});

router.get('/:id', (req, res) => {
    models.challengeModel
        .findById(req.params.id)
        .then(doc => {
            if (doc == null)
                res.status(404).send('No match');
            else
                res.json(doc);
        });
});

router.post('/', (req, res) => {
    if (!req.user || req.user.role != "admin") {
        res.status(401).send("You are unauthsorized for this action.");
    } else {
        var responses = [];
        req.body.responses.forEach(element => {
            var newResponseModel = new models.responseModel({
                description: element.description,
                correct: element.correct
            });
            responses.push(newResponseModel);
        });

        var newChallengeModel = new models.challengeModel({
            name: req.body.name,
            challenge: req.body.challenge,
            points: req.body.points,
            responses
        });

        models.challengeModel
            .findOne({ 'name': newChallengeModel.name }, function (err, challenge) {
                if (err) return handleError(err);
                if (challenge) {
                    res.status(405).send("Challenge already registered with id "+challenge._id);
                } else {
                    newChallengeModel.save(function (err, challenge) {
                        if (err) return res.status(500).send(err);
                        res.json(challenge);
                    });
                }
        });
    }
});

module.exports = router;