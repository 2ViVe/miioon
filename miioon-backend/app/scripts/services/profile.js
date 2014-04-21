'use strict';

angular.module('2ViVe')
  .factory('Profile', ['$http',
    function($http) {
      var Profile = {
        isLogin: false,
        fetch: function() {
          return $http.get('/api/v2/profile')
            .success(function(data) {
              Profile.data = data.response;
              Profile.isLogin = true;
            });
        }
      };
      return Profile;
    }]);