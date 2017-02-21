'use strict';

var express = require('express');
var controller = require('./apps.controller.js');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',auth.isAuthenticated(), controller.index);
router.get('/customers',auth.isAuthenticated(), controller.getCustomerDetail);
//router.get('/all/:orgId', controller.indexForOrg);
router.get('/:id', controller.show); //only temporary
//router.post('/', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;