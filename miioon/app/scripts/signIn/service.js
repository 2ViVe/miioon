'use strict';

angular.module('2ViVe')
  .factory('User', ['$http', function($http) {
    var User = function() {

    };
    User.prototype.login = function(username, password, clientId) {
      var user = this;
      return $http.post('/api/v2/authentications/token', {
        user: username,
        password: password,
        'client-id': clientId
      }).success(function(data) {
        user.token = data.response['authentication-token'];
      });
    };
    return User;
  }]);