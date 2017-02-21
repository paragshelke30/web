(function () {
  'use strict';

  angular
    .module('web-admin')
    .run(runBlock);

  runBlock.$inject = ['nfLocalization', '$rootScope'];

  function runBlock(nfLocalization, $rootScope) {
    var localizationConfig = {
      locale: navigator.language || '',
      path: 'locales/'
    };

    nfLocalization.init(localizationConfig)
      .then(function () {
        $rootScope.translations = nfLocalization.getTexts();
      });
  }
})();
