(function () {
  'use strict';

  angular
    .module('web-admin')
    .config(routes);

  routes.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$qProvider'
  ];

  function routes(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $qProvider
  ) {
    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true);
    $qProvider.errorOnUnhandledRejections(false);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'vm',
        authenticate: false
      })
      .state('admin.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        authenticate: false
      });
  }
})();
