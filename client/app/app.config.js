(function () {
  'use strict';

  angular
    .module('web-admin')
    .config(configure);

  configure.$inject = ['$httpProvider', 'toastrConfig'];

  function configure($httpProvider, toastrConfig) {
    var API_URL = 'http://172.25.16.45:6002/';
    /*var API_URL = 'http://localhost:6002/';*/

    activate();

    function activate() {
      $httpProvider.interceptors.push(apiInterceptor);
      $httpProvider.defaults.headers.post['Accept'] = 'application/json';
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      /*$httpProvider.interceptors.push('authInterceptor');*/

      angular.extend(toastrConfig, {
        positionClass: 'toast-bottom-full-width',
        target: 'body'
      });
    }

    function apiInterceptor($q) {
      return {
        request: function (config) {
          var url = config.url;

          if (url.endsWith('.html') || url.endsWith('.json') || url.endsWith('.svg')) {
            return config || $q.when(config);
          }

          config.url = API_URL + config.url;
          return config || $q.when(config);
        }
      };
    }
  }
})();
