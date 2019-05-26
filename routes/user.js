const UserModel = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    UserModel
        .find()
        .then(doc => {
            res.json(doc);
        });
});

router.get('/:id', (req, res) => {
    UserModel
        .findById(req.params.id)
        .then(doc => {
            if (row == null)
                res.status(404).send('No match');
            else
                res.json(row);
        });
});

router.post('/', (req, res) => {
    var newUserModel = new UserModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        points: 0,
        role: req.body.role,
    });

    UserModel
        .find({ 'username': newUserModel.username }, 'id', function (err, user) {
            if (err) return handleError(err);
            if (user.length)
                res.status(405).send("User already registered with id "+UserModel.id);
            else
                newUserModel.save(function (err, fluffy) {
                    if (err) return res.status(500).send(err);
                    res.json(newUserModel);
                });
    });
});

module.exports = router;