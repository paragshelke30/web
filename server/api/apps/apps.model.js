'use strict';

var Sequelize = require('sequelize');
var db        = require('../../config/db');

var Apps = db.define('AppSubscription', {
  Appsubscription_ID    : {
    type      : Sequelize.INTEGER,
    primaryKey: true
  },
  Organization_ID  : Sequelize.STRING,
  App_ID  : Sequelize.STRING,
  Status  : Sequelize.STRING,
  NumberOfActiveUsers  : Sequelize.INTEGER,
  TotalNumberOfUsers  : Sequelize.INTEGER,
  Licenses  : Sequelize.INTEGER,
  ChangedBy  : Sequelize.STRING,
  OptionalInfo  : Sequelize.STRING,
  Reseller_ID  : Sequelize.STRING,
  Created  : Sequelize.DATE,
  Updated  : Sequelize.DATE,
  Deleted  : Sequelize.DATE,
  EmailAddress  : Sequelize.STRING,
  PhoneNumber  : Sequelize.STRING,
  AuthenticationType  : Sequelize.STRING,
  AuthenticationEndpoint  : Sequelize.STRING,
  BackendTypeOfSystem  : Sequelize.STRING,
  BackendEndpoint  : Sequelize.STRING,
  NameContact  : Sequelize.STRING
},{
  createdAt: false,
  updatedAt: false,
  tableName: 'AppSubscription'
});

module.exports = Apps;

