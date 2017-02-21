(function () {
  'use strict';

  angular
    .module('app.service')
    .factory('loginService', loginService);

  loginService.$inject = [
    '$q',
    '$window',
    '$http',
    '$httpParamSerializer',
    '$mdDialog',
    '$state',
    'commonService',
    '$rootScope'
  ];

  function loginService(
    $q,
    $window,
    $http,
    $httpParamSerializer,
    $mdDialog,
    $state,
    commonService,
    $rootScope) {
    var service = {
        login: login,
        selectOrganization: selectOrganization,
        getConfig: getConfig
      },
      translations = $rootScope.translations.login;

    return service;

    function login(user) {
      var deferred = $q.defer();

      $http({
        method: 'POST',
        url: 'login',
        transformRequest: $httpParamSerializer,
        data: {
          clientId: 'default',
          clientSecret: 'SECRET',
          username: user.username,
          password: user.password
        }
      }).then(deferred.resolve, deferred.reject);

      return deferred.promise;
    }

    function selectOrganization(ev, data) {
      $mdDialog.show({
          locals: {
            organizations: data.organizations
          },
          controller: DialogController,
          templateUrl: 'app/login/organization.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          fullscreen: true // Only for -xs, -sm breakpoints.
        })
        .then(function (answer) {
          /* $scope.status = 'You said the information was "' + answer + '".';*/
        }, function () {
          /*$scope.status = 'You cancelled the dialog.';*/
        });

      function DialogController($scope, $mdDialog, organizations) {
        $scope.organizations = organizations;

        $scope.setOrganization = function () {
          var config;
          if ($scope.organizationSelect) {
            $scope.hide();
            config = JSON.parse(localStorage.getItem('config'));
            config.organization = $scope.organizationSelect;
            localStorage.setItem('config', JSON.stringify(config));

            getConfig(config).then(function (data) {
              $state.go('admin.dashboard');
            }, function (error) {
              console.log('Error getConfig', error);
            });
          } else {
            commonService.toast('error', translations.organizations);
          }
        };

        $scope.hide = function () {
          $mdDialog.hide();
        };

        $scope.cancel = function () {
          $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
          $mdDialog.hide(answer);
        };
      }
    }

    function getConfig(config) {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: 'getConfig',
        transformRequest: $httpParamSerializer,
        data: {
          clientId: 'default',
          clientSecret: 'SECRET',
          orgId: config.organization.id,
          user_id: config.user.id
        }
      }).then(deferred.resolve, deferred.reject);

      return deferred.promise;
    }
  }
})();
