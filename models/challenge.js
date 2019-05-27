const mongoose = require('mongoose');
const ResponseSchema = require('../models/response');
module.exports = new mongoose.Schema({
    name: {type: String, required: true, max: 50},
    challenge: {type: String, required: true, max: 50},
    points: {type: Number, required: true, max: 999},
    responses: [ResponseSchema]
});
