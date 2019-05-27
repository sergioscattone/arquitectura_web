const mongoose        = require('mongoose');
const config          = require('../config');
const userSchema      = require('./user');
const challengeSchema = require('./challenge');
const responseSchema  = require('./response');

mongoose.connect(config.database, {useNewUrlParser: true});
module.exports.userModel      = mongoose.model('userModel', userSchema);
module.exports.challengeModel = mongoose.model('challengeModel', challengeSchema);
module.exports.responseModel  = mongoose.model('responseModel', responseSchema);