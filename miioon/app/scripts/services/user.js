'use strict';

angular.module('2ViVe')
  .factory('User', ['$http', 'LocalStorage',
    function($http, LocalStorage) {
      var User = {
        isLogin: false,
        login: function(username, password, isRemember) {
          return $http.post('/api/v2/authentications/token', {
            user: username,
            password: password,
            'client-id': 'ZlnElLNFjFt6pOBAOQpH8e',
            'remember-me': isRemember
          }).success(function() {
            LocalStorage.removeVisitorId();
            User.isLogin = true;
          });
        },
        logout: function() {
        },
        fetch: function() {
          return $http.get('/api/v2/profile')
            .success(function(data) {
              User.data = data.response;
              User.isLogin = true;
            });
        }
      };
      return User;
    }]);