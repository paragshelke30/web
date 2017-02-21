(function () {
  'use strict';

  angular
    .module('app.filter', [])
    .filter('YesNo', filterYesNo)
    .filter('unique', filterUnique)
    .filter('filterMultiple', filterMultiple)
    .filter('filterTemplates', filterTemplates);

  function filterYesNo() {
    return function (text) {
      return text ? 'Yes' : 'No';
    };
  }

  function filterTemplates() {
    return function (collection, keyname) {
      var output = [];
      var kw = '';

      if (keyname) {
        kw = keyname.toLowerCase();

        angular.forEach(collection, function (item) {
          if (isValidTemplateField(item, kw)) {
            output.push(item);
          }
        });
      } else {
        output = collection;
      }

      return output;
    };
  }

  function isValidTemplateField(item, kw) {
    var tFields = ['title', 'updated'];
    var dField, rType;
    var retVal = false;

    for (var i = 0; i < tFields.length; i++) {
      if (item[tFields[i]] !== undefined &&
        item.hasOwnProperty(tFields[i]) &&
        item[tFields[i]] !== '') {
        dField = item[tFields[i]].toLowerCase();

        if (dField.indexOf(kw) > -1) {
          retVal = true;
          break;
        }
      }
    }

    return retVal;
  }

  function filterUnique() {
    return function (collection, keyname) {
      var output = [], keys = [];
      var key = '';

      angular.forEach(collection, function (item) {
        key = item[keyname];

        if (keys.indexOf(key) === -1) {
          keys.push(key);
          output.push(item);
        }
      });

      return output;
    };
  }

  function filterMultiple($filter, filtersService) {
    return function (items, keyObj) {
      var filterObj = {
        data: items,
        filteredData: []
      };

      if (keyObj) {
        angular.forEach(keyObj, function (obj, key) {
          applyMultipleFilter(filtersService, $filter, filterObj, obj, key);
        });
      }

      return filterObj.filteredData;
    };
  }

  function applyMultipleFilter(filtersService, $filter, filterObj, obj, key) {
    var fData = [];

    if (filterObj.filteredData && filterObj.filteredData.length === 0) {
      filterObj.filteredData = filterObj.data;
    }

    if (obj) {
      var fObj = {};
      var dObj = {};
      dObj = applyMultipleDates(filtersService, obj, key);

      if (angular.isArray(obj)) {
        if (obj.length > 0) {
          angular.forEach(obj, function (val, k) {
            if (angular.isDefined(val)) {
              fObj[key] = val;
              fData = fData.concat($filter('filter')(filterObj.filteredData, fObj));
            }
          });
        }
      } else {
        fObj[key] = obj;
        fData = fData.concat($filter('filter')(filterObj.filteredData, fObj));
      }

      if (fData.length > 0) {
        filterObj.filteredData = fData;
      }
    }
  }

  function applyMultipleDates(filtersService, obj, key) {
    var retVal = null;
    var newObj = null;

    if (key === 'createdDate') {
      if (obj[0] === 7) {
        newObj = filtersService.getLastWeekDays();
      }

      if (obj[0] === 30) {
        var tmpDate = new Date();
        var tmpMM = tmpDate.getMonth() - 1;
        newObj = filtersService.getLastWeekDays();
      }

      retVal = newObj;
    }

    return retVal;
  }
})();
