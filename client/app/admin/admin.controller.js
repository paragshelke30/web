(function () {
  'use strict';

  angular
    .module('web-admin')
    .controller('AdminController', AdminController);
  AdminController.$inject = ['$scope', '$http'];

  function AdminController($scope, $http) {
    var vm = this;

    $scope.paginatorCallback = paginatorCallback;

    function paginatorCallback(page, pageSize) {
      var offset = (page - 1) * pageSize;

      return $http.get('http://172.25.16.59:6002/batchLimit?page=' +
        page + '&limit=' + pageSize, {}).then(function (result) {
        return {
          results: result.data,
          totalResultCount: result.data.length + pageSize
        };
      });
    }
  }
})();
