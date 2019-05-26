const Sequelize = require('sequelize');
const User      = require('./user');
const Points    = require('./points');
const Challenge = require('./challenge');
const Response  = require('./response');

var db = {}; // Diccionario

const sequelize = new Sequelize('mainDB', null, null, {
    dialect: "sqlite",
    storage: "./mainDB.sqlite"
});

sequelize.authenticate()
    .then(function() { console.log('Autenticado!'); })
    .catch(function() { console.log('No me autentica'); });

const sincronizar = function() {
    sequelize.sync({"force":true})
        .then(function(err) {
            console.log('Sincronizado');
        })
        .catch(function(err) {
            console.log('Error al sincronizar. :(');
        });
};

db.sync = sincronizar;

db.User      = User(sequelize, Sequelize);
db.Point     = Points(sequelize, Sequelize);
db.Challenge = Challenge(sequelize, Sequelize);
db.Response  = Response(sequelize, Sequelize);

//db.Persona.associate(db);

module.exports = db;