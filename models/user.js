const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    first_name: {type: String, required: true, max: 50},
    last_name: {type: String, required: true, max: 50},
    username: {type: String, required: true, max: 50},
    password: {type: String, required: true, max: 50},
    points: {type: Number, required: true, max: 99999},
    role: {type: String, required: true, enum: ['normal', 'admin']}
});
