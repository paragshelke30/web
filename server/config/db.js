var Sequelize = require('sequelize');
var DB_PATH   = 'root2:root2@localhost:3306/app';
var db        = new Sequelize('mysql://' + DB_PATH, {});


module.exports = db;