const express    = require('express');
const bodyparser = require('body-parser');
// look for have only one router file
const user      = require('./routes/user');
const points    = require('./routes/points');
const challenge = require('./routes/challenge');
const response  = require('./routes/response');

const app = express();

app.use(bodyparser.json());

//models.sync();

app.use('/user', user);
app.use('/points', points);
app.use('/challenge', challenge);
app.use('/response', response);

var port = 5000;
app.listen(port, function() { console.log("Server online"); });