const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trabajo_practico', {useNewUrlParser: true});

let ResponseSchema = new mongoose.Schema({
    challenge: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ChallengeSchema',
        required: true
    },
    description: {type: String, required: true, max: 50},
    correct: {type: Boolean, required: false, default: false}
});

module.exports = mongoose.model('ResponseModel', ResponseSchema);
