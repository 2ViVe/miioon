'use strict';

angular.module('2ViVe')
  .factory('User', ['$http', 'CLIENT_ID', 'LocalStorage',
    function($http, CLIENT_ID, LocalStorage) {
      var token = 'MTAwODEwMTo6NDQ5ODM6OnRlc3QxMjM6Ojo6MTM5NzY2OTIzMzQxODo6WmxuRWxMTkZqRnQ2cE9CQU9RcEg4ZTo6R09MZEIxWEhTN0w4NGNON1o1Mjc3aU8vQ2pqc29PTEtMSHJ2RjNHZHJ6MD0=';
      var User = {
        login: function(username, password) {
          return $http.post('/api/v2/authentications/token', {
            user: username,
            password: password,
            'client-id': CLIENT_ID
          }).success(function(data) {
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
        getToken: function() {
          return LocalStorage.getToken();
        },
        isRememberedLogin: function() {
          return LocalStorage.isTokenSaved();
        }
      };
      return User;
    }]);