'use strict';

angular.module('2ViVe')
  .factory('User', ['$http', 'CLIENT_ID',
    function($http, CLIENT_ID) {
      var token = 'MTAwODEwMTo6NDQ5ODM6OnRlc3QxMjM6Ojo6MTM5NzY1NTg1MTgwMDo6WmxuRWxMTkZqRnQ2cE9CQU9RcEg4ZTo6TXR3Tm04QWwxRk5Mb1RjeVdSU3p4dVQyc0JsTnVGdzdOV3BSWEVDZW04VT0=';
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
        getToken: function() {
          return token;
        }
      };
    }]);