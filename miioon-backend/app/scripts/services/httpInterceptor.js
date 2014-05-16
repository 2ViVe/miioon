'use strict';

angular.module('2ViVe')
  .factory('HttpInterceptor', ['$q', '$cookies', function($q, $cookies) {
    return {
      request: function(config) {
        var deferred = $q.defer();
        delete $cookies.sid;
        deferred.resolve(config);
        return deferred.promise;
      }
    };
  }]);