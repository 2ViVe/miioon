'use strict';

angular.module('2ViVe')
  .factory('User', ['$http', 'CLIENT_ID', 'LocalStorage',
    function($http, CLIENT_ID, LocalStorage) {
      var token;
      var User = {
        login: function(username, password) {
          return $http.post('/api/v2/authentications/token', {
            user: username,
            password: password,
            'client-id': CLIENT_ID
          }).success(function(data) {
            token = data.response['authentication-token'];
            LocalStorage.setToken(data.response['authentication-token']);
            LocalStorage.removeVisitorId();
          });
        },
        logout: function() {
          LocalStorage.removeToken();
        },
        forget: function() {
          LocalStorage.removeToken();
        },
        remember: function() {
          LocalStorage.saveToken(token);
        },
        isRememberedLogin: function() {
          return LocalStorage.isTokenSaved();
        }
      };
      return User;
    }]);