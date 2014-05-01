'use strict';

angular.module('2ViVe')
  .factory('HttpInterceptor', ['$q', 'LocalStorage',
    function($q, LocalStorage) {
      return {
        'request': function(config) {
          var token = LocalStorage.getToken();
          if(token) {
            config.headers['X-Authentication-Token'] = token;
          }
          return config || $q.when(config);
        }
      };
    }]);