(function () {
  'use strict';

  angular
    .module('web-admin')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    '$rootScope',
    'loginService',
    'commonService',
    '$state',
    '$log'
  ];

  function LoginController(
    $rootScope,
    loginService,
    commonService,
    $state,
    $log) {

    var vm = this;

    vm.translations = $rootScope.translations.login;
    vm.user = {};
    vm.user.username = 'Lexicon';
    vm.user.password = 'Admin';
    vm.login = login;

    function login(ev) {
      loginService.login(vm.user)
        .then(function (data) {
          console.info(data.data);
          /* $state.go('admin.dashboard');*/
          loginService.selectOrganization(ev, data.data);
        }, function (error) {
          $log.error('error', error);
          commonService.toast('error', error.data);
        });
    }
  }
})();