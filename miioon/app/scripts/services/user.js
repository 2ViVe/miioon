'use strict';

angular.module('2ViVe')
  .factory('User', ['$http', 'CLIENT_ID', 'LocalStorage',
    function($http, CLIENT_ID, LocalStorage) {
      var token;
      var User = {
        isLogin: false,
        login: function(username, password) {
          return $http.post('/api/v2/authentications/token', {
            user: username,
            password: password,
            'client-id': CLIENT_ID
          }).success(function(data) {
            token = data.response['authentication-token'];
            LocalStorage.setToken(token);
            LocalStorage.removeVisitorId();
            User.isLogin = true;
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
        isRemembered: function() {
          return LocalStorage.isTokenSaved();
        },
        fetch: function() {
          return $http.get('/api/v2/profile')
            .success(function(data) {
              User.data = data.response;
            });
        }
      };
      return User;
    }]);