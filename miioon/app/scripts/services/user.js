'use strict';

angular.module('2ViVe')
  .factory('User', ['$http', 'LocalStorage',
    function($http, LocalStorage) {
      var User = {
        login: function(username, password, isRemember) {
          return $http.post('/api/login', {
            user: username,
            password: password,
            'remember-me': isRemember
          }).success(function() {
            LocalStorage.removeVisitorId();
            User.isLogin = true;
          });
        },
        logout: function() {
          return $http.post('/api/logout')
            .success(function() {
              LocalStorage.clearSession();
              User.isLogin = false;
            });
        },
        fetch: function() {
          User.onFetch = $http.get('/api/v2/profile')
            .success(function(data) {
              User.data = data.response;
              User.isLogin = true;
            })
            .error(function() {
              User.isLogin = false;
            });
          return User.onFetch;
        }
      };
      return User;
    }]);