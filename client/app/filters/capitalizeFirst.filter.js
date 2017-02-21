(function () {
  'use strict';

  angular.module('app.filter')
    .filter('newCapitalizeFirst', CapitalizeFirst);

  function CapitalizeFirst() {
    return function (word) {
      var newWord = '';

      if (word && word.length > 0) {
        newWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }

      return newWord;
    };
  }
})
();
