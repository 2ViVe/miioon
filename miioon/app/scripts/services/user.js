'use strict';

angular.module('2ViVe')
  .factory('User', ['$http', 'CLIENT_ID', '$cookies',
    function($http, CLIENT_ID, $cookies) {
      var token = 'MTAwODEwMTo6NDQ5ODM6OnRlc3QxMjM6Ojo6MTM5NzY2OTIzMzQxODo6WmxuRWxMTkZqRnQ2cE9CQU9RcEg4ZTo6R09MZEIxWEhTN0w4NGNON1o1Mjc3aU8vQ2pqc29PTEtMSHJ2RjNHZHJ6MD0=';
      return {
        login: function(username, password) {
          return $http.post('/api/v2/authentications/token', {
            user: username,
            password: password,
            'client-id': CLIENT_ID
          }).success(function(data) {
            token = data.response['authentication-token'];
          });
        },
        forget: function() {
          $cookies.token = '';
        },
        remember: function() {
          $cookies.token = token;
        },
        getToken: function() {
          return $cookies.token ? $cookies.token : token;
        },
        isRememberedLogin: function() {
          return $cookies.token;
        }
      };
    }]);