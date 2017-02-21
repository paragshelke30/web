/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Sequelize = require('sequelize');
//var DB_PATH = process.env.DB_PATH || 'root:admin123@127.0.0.1:3306/showcaseapp_db';
var DB_PATH   = 'master:1234@devdb.dev.com:3306/ConfigDB';

var db        = new Sequelize('mysql://' + DB_PATH, {});


var _    = require('lodash');
var Apps = require('./apps.model.js');

// Get list of things
exports.index = function (req, res) {
  Apps.findAll()
    .then(function (apps) {
      return res.status(200).json(apps);
    });
};

// Get single App
exports.show = function (req, res) {
  //Temporary find all
  Apps.findAll({
    where: { App_ID: req.params.id}
  })
    .then(function (apps) {
      return res.status(200).json(apps);
    });

  //Apps.findAll({
  //  where: {App_ID: req.params.id},
  //})
  //  .then(function (app, err) {
  //    if (err) {
  //      return handleError(res, err);
  //    }
  //    if (!app) {
  //      return res.status(404).send('Not Found');
  //    }
  //    return res.json(app);
  //  });
};
//
exports.getCustomerDetail = function (req, res) {

  db.query('CALL getCustomerDetail("ShowCase");').then(function(response){
    return res.status(200).json(response);
  }).error(function(err){
    return handleError(res, err);
  });
};
//
//
//// Creates a new thing in the DB.
//exports.create = function (req, res) {
//  MenuItem.create(req.body)
//    .then(function (createdFile) {
//      return res.status(201).json(createdFile);
//    });
//};
//
//// Updates an existing thing in the DB.
//exports.update = function (req, res) {
//  MenuItem.findById(req.params.id)
//    .then(function (thing, err) {
//      if (err) {
//        return handleError(res, err);
//      }
//      var updated = _.merge(thing, req.body);
//      updated.save()
//        .then(function (item) {
//          return res.status(200).json(item);
//        })
//        .catch(function(err){
//          return handleError(res, err);
//        })
//    });
//};
//
//// Deletes a thing from the DB.
//exports.destroy = function (req, res) {
//  MenuItem.destroy({where: {id: req.params.id}})
//    .then(function (err, deletedMenuItem) {
//      return res.status(204).json(deletedMenuItem);
//    });
//};

function handleError(res, err) {
  return res.status(500).send(err);
}
