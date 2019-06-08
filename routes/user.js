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
                if (err) return console.log(err);
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

router.delete('/:id', (req, res) => {
    if (!req.user || req.user.role != "admin") {
        res.status(401).send("You are unauthorized for this action.");
    } else {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).send('ID has wrong format');
        } else {
            models.userModel
                .findById(req.params.id)
                .then(user => {
                    if (user.role == 'admin') {
                        res.status(400).send('Admin user can not be deleted');
                    } else if (!user) {
                        res.send('User with ID ' + req.params.id + ' does not exist');
                    } else {
                        models.userModel.remove({ _id: req.params.id }, ()=>{
                            res.send('User with ID ' + user._id + ' deleted');
                        });
                    }
                });
        }
    }
});

router.patch('/:id', (req, res) => {
    if (!req.user || req.user.role != "admin") {
        res.status(401).send("You are unauthorized for this action.");
    } else {
        models.userModel
            .findById(req.params.id)
            .then(user => {
                if (!user)
                    res.status(404).send('No match');
                else {
                    models.userModel
                        .findOneAndUpdate({"_id": user._id}, 
                            {$set:{
                                first_name: req.body.first_name || user.first_name,
                                last_name: req.body.last_name || user.last_name,
                                username: req.body.username || user.username,
                                password:  bcrypt.hashSync(req.body.password || user.password, config.hashSalt),
                            }})
                            .then((user) => {
                                res.send("User with ID "+ user._id + " updated.");    
                            });
                }
            });
    }
});

module.exports = router;