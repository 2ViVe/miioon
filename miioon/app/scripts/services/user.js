'use strict';

angular.module('2ViVe')
  .factory('User', ['$http',
    function($http) {
      var CLIENT_ID = 'test_client_id_1';
      var CLIENT_SECRET = 'test_client_secret_1';

      var User = function() {
        this.clientId = CLIENT_ID;
        this.clientSecret = CLIENT_SECRET;
      };
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