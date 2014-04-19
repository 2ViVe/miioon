'use strict';

angular.module('2ViVe')
  .factory('HttpInterceptor', ['$q', 'LocalStorage', 'CLIENT_ID',
    function($q, LocalStorage, CLIENT_ID) {
      return {
        'request': function(config) {
          config.headers['x-client-id'] = CLIENT_ID;
          config.headers['x-client-secret'] = 'HeFsCAvsXTzpHWAqRVWCibsUYlF7gjpLRUAUw551r';
          var token = LocalStorage.getToken();
          if(token) {
            config.headers['X-Authentication-Token'] = token;
          }
          return config || $q.when(config);
        }
      };
    }]);