const models  = require('../models/index');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
    models.challengeModel
        .find()
        .then(challenges => {
            res.json(challenges);
        });
});

router.get('/:id', (req, res) => {
    models.challengeModel
        .findById(req.params.id)
        .then(challenge => {
            if (challenge == null)
                res.status(404).send('No match');
            else
                res.json(challenge);
        });
});

router.post('/', (req, res) => {
    if (!req.user || req.user.role != "admin") {
        res.status(401).send("You are unauthorized for this action.");
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

router.delete('/:id', (req, res) => {
    if (!req.user || req.user.role != "admin") {
        res.status(401).send("You are unauthorized for this action.");
    } else {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).send('ID has wrong format');
        } else {
            models.challengeModel
                .findById(req.params.id)
                .then(challenge => {
                    if (!challenge) {
                        res.send('Challenge with ID ' + req.params.id + ' does not exist');
                    } else {
                        models.challengeModel.remove({ _id: req.params.id }, ()=>{
                            res.send('Challenge ' + challenge._id + ' deleted');
                        });
                    }
                });
        }
    }
});

router.put('/:id', (req, res) => {
    if (!req.user || req.user.role != "admin") {
        res.status(401).send("You are unauthorized for this action.");
    } else {
        models.challengeModel
            .findById(req.params.id)
            .then(challenge => {
                if (challenge == null)
                    res.status(404).send('No match');
                else{
                    var responses = [];
                    
                    challenge.responses.forEach(response => {
                        responses.push(response);
                    });

                    if (!req.body.responses) {
                        res.status(400).send('You must send at least one response.');
                    } else {
                        req.body.responses.forEach(response => {
                            var newResponseModel = new models.responseModel({
                                description: response.description,
                                correct: response.correct
                            });
                            responses.push(newResponseModel);
                        });
                        models.challengeModel
                            .findOneAndUpdate({"_id": challenge._id}, 
                                {$set:{ responses: responses }})
                                .then((challenge) => {
                                    res.send("Challenge with ID "+ challenge._id + " has changed its response.");
                                });
                    }
                }
            });
    }
});

module.exports = router;