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
    '$log',
    '$http'
  ];

  function LoginController(
    $rootScope,
    loginService,
    commonService,
    $state,
    $log,
    $http) {
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
          var config = data.data;
          vm.isLogin = false;
          localStorage.setItem('config', JSON.stringify(config));
          /*$http.defaults.headers.common['Authorization'] = 'Bearer ' + config.token.access_token;*/
          loginService.selectOrganization(ev, config);
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
