const express    = require('express');
const bodyparser = require('body-parser');
// look for have only one router file
const users      = require('./routes/users');
const points     = require('./routes/points');
const challenges = require('./routes/challenges');
const responses  = require('./routes/responses');
const models     = require('./models');

const app = express();

app.use(bodyparser.json());

models.sync();

app.use('/users', users);
app.use('/points', points);
app.use('/challenges', challenges);
app.use('/options', options);
app.use('/responses', responses);

var port = 5000;
app.listen(port, function() { console.log("Server online"); });