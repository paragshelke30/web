(function () {
  'use strict';

  angular
    .module('app.directive')
    .directive('ngEnter', ngEnter)
    .directive('validateEmail', validateEmail)
    .directive('clickOnce', clickOnce);

  function ngEnter() {
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    };
  }

  function validateEmail() {
    var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    return {
      require: 'ngModel',
      restrict: '',
      link: function (scope, elm, attrs, ctrl) {
        // Only apply the validator if ngModel is present and Angular has added the email validator
        if (ctrl && ctrl.$validators.email) {
          // This will overwrite the default Angular email validator
          ctrl.$validators.email = function (modelValue) {
            return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
          };
        }
      }
    };
  }

  clickOnce.$inspect = ['$timeout'];

  function clickOnce($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var replacementText = attrs.clickOnce;

        element.bind('click', function () {
          if (scope.addForm.$valid) {
            $timeout(function () {
              if (replacementText) {
                element.html(replacementText);
              }

              element.attr('disabled', true);
            }, 0);
          }
        });
      }
    };
  }
})();
