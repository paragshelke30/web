(function () {
  'use strict';

  angular
    .module('app.service')
    .factory('commonService', commonService)
    .factory('authInterceptor', function ($location, $q, $window) {
      return {
        request: function (config) {
          config.headers = config.headers || {};

          config.headers.Authorization = 'xxxx-xxxx';

          return config;
        }
      };
    });

  commonService.$inject = [
    '$timeout',
    '$mdDialog',
    '$mdToast',
    'toastr',
    '$rootScope'
  ];

  function commonService(
    $timeout,
    $mdDialog,
    $mdToast,
    toastr,
    $rootScope) {
    var service = {
      timeout: $timeout,
      mdDialog: $mdDialog,
      mdToast: $mdToast,
      rootScope: $rootScope,
      toast: toast
    };

    return service;

    function toast(type, objectData) {
      toastr[type](objectData.description, objectData.message);
    }
  }
})();
