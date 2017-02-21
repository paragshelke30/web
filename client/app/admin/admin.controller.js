(function () {
  'use strict';

  angular
    .module('web-admin')
    .controller('AdminController', AdminController);
  AdminController.$inject = ['$scope', '$http', '$rootScope'];

  function AdminController($scope, $http, $rootScope) {
    var vm = this,
      config = JSON.parse(localStorage.getItem('config'));

    vm.translations = $rootScope.translations.admin;
    vm.displayName = config.user.Firstname + ' ' + config.user.Lastname;
    vm.organizationName = config.organization.Organization_Name;
  }
})();
