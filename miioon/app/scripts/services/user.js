'use strict';

angular.module('2ViVe')
  .factory('User', ['$http', 'LocalStorage',
    function($http, LocalStorage) {
      var User = {
        login: function(username, password, isRemember) {
          return $http.post('/authentication/token', {
            user: username,
            password: password,
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
            })
            .error(function() {
              User.isLogin = false;
            });
        }
      };
      return User;
    }]);