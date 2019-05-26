const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trabajo_practico', {useNewUrlParser: true});

let UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true, max: 50},
    last_name: {type: String, required: true, max: 50},
    username: {type: String, required: true, max: 50},
    password: {type: String, required: true, max: 50},
    points: {type: Number, required: true, max: 5},
    role: {type: String, required: true, enum: ['normal', 'admin']},
});

module.exports = mongoose.model('UserModel', UserSchema);
