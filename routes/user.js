const models  = require('../models/index');
const express = require('express');
const config  = require('../config');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/me', (req, res) => {
    if (req.user) res.json(req.user);
    else res.status(404).send('You must login before ask information.');
});

router.get('/', (req, res) => {
    models.userModel
        .find()
        .then(doc => {
            res.json(doc);
        });
});

router.get('/:id', (req, res) => {
    models.userModel
        .findById(req.params.id)
        .then(doc => {
            if (!doc)
                res.status(404).send('No match');
            else
                res.json(doc);
        });
});

router.post('/', (req, res) => {
    if (!req.user || req.user.role != "admin") {
        res.status(401).send("You are unauthorized for this action.");
    } else {
        var newUserModel = new models.userModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password:  bcrypt.hashSync(req.body.password, config.hashSalt),
            points: 0,
            role: 'normal'
        });

        models.userModel
            .findOne({ 'username': newUserModel.username }, function (err, user) {
                if (err) return handleError(err);
                if (user) {
                    res.status(405).send("User already registered with id "+user._id);
                } else {
                    newUserModel.save(function (err, user) {
                        if (err) return res.status(500).send(err);
                        res.json(user);
                    });
                }
        });
    }
});

router.post('/choose', (req, res) => {
    if (!req.user) {
        res.status(403).send("You need to be logged in order to choose.");
    } else {
        models.challengeModel
            .findOne({'_id': req.body.challenge_id, 'responses._id': req.body.response_id}, function (err, challenge) {
                if (!challenge) {
                    res.status(403).send("The challenge and / or response you had selected, does not exist.");
                } else {
                    let response = challenge.responses.id(req.body.response_id);
                    if (response.correct === true) {
                        let points = req.user.points + challenge.points;
                        models.userModel
                            .findOneAndUpdate({"_id": req.user._id}, {$set:{ points : points}}).then((updatedDoc) => {
                                res.send("YOU CHOOSE THE RIGTH ONE!");    
                        });
                    } else {
                        res.send("WRONG, BETTER LUCK NEXT TIME!");
                    }
                }
            });
    }
});

module.exports = router;