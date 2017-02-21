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
          vm.isLogin = false;
          localStorage.setItem('config', JSON.stringify(data.data));
          loginService.selectOrganization(ev, data.data);
        }, function (error) {
          vm.isLogin = false;

          if (error.data) {
            commonService.toast('error', error.data);
          } else {
            commonService.toast('error', vm.translations);
          }

          $log.error('error', error);
        });
    }
  }
})();
