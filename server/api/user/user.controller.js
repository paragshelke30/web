'use strict';


// Variables
//-------------------------------------------------------------------------------------------
var User     = require('./user.model');
var passport = require('passport');
var config   = require('../../config/environment');
var jwt      = require('jsonwebtoken');
var validationError = function (res, err) {
  return res.status(422).json(err);
};

console.log(User);

/**
 * Get list of users
 * restriction: 'admin'
 */

// Functions
//-------------------------------------------------------------------------------------------
exports.authCallback   = authCallback;
exports.changePassword = changePassword;
exports.create         = create;
exports.destroy        = destroy;
exports.getAllEmails   = getAllEmails;
exports.index          = index;
exports.me             = me;
exports.show           = show;
exports.update         = update;

/**
 * Get users
 * If admin -> get all admins/users in admins organization
 * If superadmn -> get all admins/superadmins in all organizations
 */
function index (req, res) {
  if(req.user.role === 'superadmin'){
    return User.findAll({
      where: {role: ['admin', 'superadmin']},
      attributes: ['id', 'name', 'email', 'role', 'provider', 'organization_id']
    }).then(function(users, err) {
      if (err) {
        return res.status(500).send(err);
      }
      else{
        return res.status(200).json(users);
      }
    })
  }
  else if(req.user.role === 'admin'){
    return User.findAll({
      where: {role: ['admin', 'user'], organization_id: req.user.organization_id},
      attributes: ['id', 'name', 'email', 'role', 'provider', 'organization_id']
    }).then(function(users, err) {
      if (err) {
        return res.status(500).send(err);
      }
      else{
        return res.status(200).json(users);
      }
    })
  }
}

/**
 * Gets all emails from all users in all organizations
 */

function getAllEmails(req, res){
  User.findAll({attributes: ['email']})
    .then(function (users, err) {
      if (err) {
        return res.status(500).send(err);
      }
        res.status(200).json(users);
    });
}

/**
 * Creates a new user
 */

function create (req, res, next) {
  var newUser      = req.body;
  newUser.provider = 'local';
  User.create(newUser)
    .then(function (user, err) {
      if (err) return validationError(res, err);
      return res.status(200).json(user);
    });
}

/**
 * Get a single user
 */
function show (req, res, next) {
  var userId = req.params.id;
  User.findById(userId)
    .then(function (user, err) {
      if (err) return next(err);
      if (!user) return res.status(401).send('Unauthorized');
      res.json(user.profile);
    });
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
function destroy (req, res) {
  User.destroy({where: {id: req.params.id}})
    .then(function (result, err) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(204).send('No Content');
    });
}

/**
 * Change a users password
 */
 function changePassword (req, res) {
   var meta    = req.body;
   var userId  = req.user.id;
   return User.update(
     { password: meta.user.password }, {
       where: {
        id: userId
       }
     }).then(function (result, err) {
      if(err) {
        return res.status(500).send(err);
      }
      else {
        return res.status(200).json(result);
      }
   });
 }

/**
 * Get my info
 */
function me (req, res, next) {
  var userId = req.user.id;
  User.findById(userId)
    .then(function (user, err) {
      if (err) return next(err);
      if (!user) return res.status(401).send('Unauthorized');
      res.json(user);
    });
}

/**
 * Updates a user with the provided values
 */
function update(req, res){
  var user    = req.body;

  if(user.password !== undefined){
    return User.update(
      { name: user.name,
        role: user.role,
        password: user.password }, {
        where: {
          id: user.id
        }
      }).then(function (result, err) {
        if(err) {
          return res.status(500).send(err);
        }
        else {
          return res.status(200).json(result);
        }
      });
  }
  else{
    return User.update(
      { name: user.name,
        role: user.role,}, {
        where: {
          id: user.id
        }
      }).then(function (result, err) {
        if(err) {
          return res.status(500).send(err);
        }
        else {
          return res.status(200).json(result);
        }
      });
  }

}

/**
 * Authentication callback
 */
function authCallback(req, res, next) {
  res.redirect('/');
}
