const models  = require('../models/index');
const config  = require('../config');
const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');

router.post('/', (req, res) => {
    var adminUserModel = new models.userModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password:  bcrypt.hashSync(req.body.password, config.hashSalt),
        points: 0,
        role: 'admin'
    });

    models.userModel
        .findOne({ 'role': 'admin' }, 'username', function (err, user) {
            if (err) return handleError(err);
            if (user) {
                res.status(401).send("Admin user already registered with ID: "+user._id+" USERNAME: "+user.username);
            } else {
                adminUserModel.save(function (err, fluffy) {
                    if (err) return res.status(500).send(err);
                    res.json(adminUserModel);
                });
            }
    });
});


module.exports = router;