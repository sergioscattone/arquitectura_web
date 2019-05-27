const models     = require('../models/index');
const config     = require('../config');
var jsonwebtoken = require('jsonwebtoken');
const express    = require('express');
const router     = express.Router();
const bcrypt     = require('bcrypt');

router.post('/', (req, res) => {
    models.userModel
        .findOne({ 'username': req.body.username }, 'password role', function (err, user) {
            if (err) throw err;
            if (!user) {
                res.status(400).json('User not found');
            } else if (!req.body.password) {
                res.status(400).json('Password not provided');
            } else {
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    res.status(401).json('Wrong password');
                } else {
                    const payload = {
                        userId: user._id
                    };
                    var token = jsonwebtoken.sign(payload, config.tokenKey, {
                        expiresIn: 1440
                    });
                    res.json({token: token});
                }
            }
    });
});

module.exports = router;