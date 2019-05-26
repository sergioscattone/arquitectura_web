const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trabajo_practico', {useNewUrlParser: true});

let ChallengeSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 50},
    challenge: {type: String, required: true, max: 50},
    points: {type: Number, required: true, max: 3},
});

module.exports = mongoose.model('ChallengeModel', ChallengeSchema);
