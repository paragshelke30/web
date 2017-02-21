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
    '$mdDialog'
  ];

  function loginService(
    $q,
    $window,
    $http,
    $httpParamSerializer,
    $mdDialog) {
    var service = {
      login: login,
      selectOrganization: selectOrganization
    };

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
        $scope.organization = false;

        $scope.setOrganization = function () {
          $scope.hide();
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

    return service;
  }
})();