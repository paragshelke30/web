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
    vm.isLogin = false;
    vm.user = {};
    vm.user.username = 'Lexicon';
    vm.user.password = 'Admin';
    vm.login = login;

    function login(ev) {
      vm.isLogin = true;
      loginService.login(vm.user)
        .then(function (data) {
          vm.isLogin = true;
          loginService.selectOrganization(ev, data.data);
        }, function (error) {
          vm.isLogin = false;
          $log.error('error', error);
          commonService.toast('error', error.data);
        });
    }
  }
})();
