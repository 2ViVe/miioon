'use strict';

angular.module('2ViVe')
  .factory('keySwitcher', function() {

    return function (keyHandlerFn) {

      return function switchKey(data) {
        var result;
        try {
          data = angular.fromJson(data);
          var keys = Object.keys(data);
          result = angular.isArray(data) ? [] : {};

          angular.forEach(keys, function (key) {
            var camelCasedKey = keyHandlerFn(key);
            if (!data.hasOwnProperty(key)) {
              return;
            }
            if (data[key] && typeof data[key] === 'object') {
              result[camelCasedKey] = switchKey(data[key]);
            }
            else {
              result[camelCasedKey] = data[key];
            }
          });
        }
        catch(e) {
          result = data;
        }

        return result;
      };
    };
  });