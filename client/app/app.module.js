(function () {
  'use strict';

  angular
    .module('web-admin', [
      'app.service',
      'app.directive',
      'app.filter',
      'app.login',
      'ngMaterial',
      'ngAnimate',
      'ngSanitize',
      'ui.router',
      'nf.localization',
      'toastr'
    ]);
})();
