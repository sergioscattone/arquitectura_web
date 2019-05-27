const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    description: {type: String, required: true, max: 50},
    correct: {type: Boolean, required: false, default: false}
});
