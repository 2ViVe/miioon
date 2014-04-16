'use strict';

angular.module('2ViVe')
  .factory('Profile', ['$http', 'User',
    function($http, User) {
      var Profile = {
        isLogin: false,
        fetch: function() {
          return $http.get('/api/v2/profile', {
            headers: {
              'X-Authentication-Token': User.getToken()
            }
          }).success(function(data) {
            Profile.data = data.response;
            Profile.isLogin = true;
          });
        }
      };
      return Profile;
    }]);