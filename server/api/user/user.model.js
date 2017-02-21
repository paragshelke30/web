'use strict';

var crypto    = require('crypto');
var db        = require('../../config/db');
var Sequelize = require('sequelize');

var User = db.define('User', {
    name          : Sequelize.STRING,
    email         : {
      type: Sequelize.STRING
    },
    organization_id: Sequelize.STRING,
    role          : {
      type        : Sequelize.STRING,
      defaultValue: 'user'
    },
    hashedPassword: Sequelize.STRING,
    provider      : Sequelize.STRING,
    salt          : Sequelize.STRING,
    password      : {
      type: Sequelize.VIRTUAL,
      set : function (password) {
        this._password      = password;
        this.salt           = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
      },
      get : function () {
        return this._password;
      }
    },
    profile       : {
      type: Sequelize.VIRTUAL,
      get : function () {
        return {
          'name': this.name,
          'role': this.role,
          'env' : process.env.NODE_ENV
        };
      }
    },
    token         : {
      type: Sequelize.VIRTUAL,
      get : function () {
        return {
          'id' : this.id,
          'role': this.role
        };
      }
    }
  },
  {
    instanceMethods: {
      authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
      },
      makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
      },
      encryptPassword: function (password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
      }
    }
  });

var validatePresenceOf = function (value) {
  return value && value.length;
};

User.hook('beforeCreate', function (user, options, next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.hashedPassword))
    next(new Error('Invalid password'));
  else
    next();
});
/**
 * Pre-save hook
 */

module.exports = User;
