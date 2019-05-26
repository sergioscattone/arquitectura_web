const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let UserSchema = new Schema({
    first_name: {type: String, required: true, max: 50},
    last_name: {type: String, required: true, max: 50},
    username: {type: String, required: true, max: 50},
    password: {type: String, required: true, max: 50},
    role: {type: String, required: true, enum: ['normal', 'admin']},
});

// Export the model
module.exports = mongoose.model('User', UserSchema);

/**
 * User.count({_id: userID}, function (err, count){ 
    if(count>0){
        //document exists });
    }
}); 
 */