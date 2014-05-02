angular.module('2ViVe')
  .factory('CamelCaseLize', function() {
    function camelcase(key) {
      return key.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    }

    function camelCaselize(data) {
      data = angular.fromJson(data);
      var keys = Object.keys(data);
      var result = {};

      angular.forEach(keys, function(key) {
        var camelCasedKey = camelcase(key);
        if (!data.hasOwnProperty(key)) {
          return;
        }
        if (data[key] && typeof data[key] === 'object') {
          result[camelCasedKey] = camelCaselize(data[key]);
        }
        else {
          result[camelCasedKey] = data[key];
        }
      });
      return result;
    }

    return camelCaselize;
  });