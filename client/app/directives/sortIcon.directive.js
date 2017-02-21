(function () {
  'use strict';

  angular
    .module('app.directive')
    .directive('newSortIcon', newSortIcon);

  function newSortIcon() {
    var directive = {
      restrict: 'EA',
      template:
        ['<md-icon ng-if="vm.showUp" md-svg-src="images/mi/arrow-circle-bottom.svg"></md-icon>',
        '<md-icon ng-if="vm.showDown" md-svg-src="images/mi/arrow-circle-top.svg"></md-icon>']
        .join(''),
      scope: {
        orderName: '@',
        orderField: '='
      },
      link: sortLink,
      controller: SortIconController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function sortLink(scope, el, attr, ctrl) {
      scope.$watch('vm.orderField',
        function (newValue, oldValue) {
          scope.vm.toggleIcon();
        }, true);
    }
  }

  function SortIconController() {
    var vm = this;
    vm.showDown = false;
    vm.showUp = false;
    vm.toggleIcon = toggleIcon;

    activate();

    function activate() {
      toggleIcon();
    }

    function toggleIcon() {
      if (vm.orderField === '') {
        vm.showUp = false;
        vm.showDown = false;
      }
      else if (vm.orderName === vm.orderField) {
        vm.showUp = true;
        vm.showDown = false;
      }
      else if (('-' + vm.orderName) === vm.orderField) {
        vm.showUp = false;
        vm.showDown = true;
      }
      else {
        vm.showUp = false;
        vm.showDown = false;
      }
    }
  }
})
();
