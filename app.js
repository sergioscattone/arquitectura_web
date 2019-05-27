const express    = require('express');
const bodyparser = require('body-parser');
const routes     = require('./routes/index');
const middleware = require('./middleware');

const app = express();
app.use(bodyparser.json());
middleware.applyJwt(app); // this run before set the routes????

app.use('/setup', routes.setup);
app.use('/login', routes.login);
app.use('/user', routes.user);
app.use('/challenge', routes.challenge);

var port = 5000;
app.listen(port, function() { console.log("Server online"); });