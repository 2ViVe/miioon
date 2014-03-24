'use strict';

angular.module('2ViVe')
  .factory('User', ['$http', 'CLIENT_ID',
    function($http, CLIENT_ID) {
      var User = function() {};
      User.prototype.login = function(username, password) {
        var user = this;
        return $http.post('/api/v2/authentications/token', {
          user: username,
          password: password,
          'client-id': CLIENT_ID
        }).success(function(data) {
          user.token = data.response['authentication-token'];
        });
      };
      return User;
    }]);