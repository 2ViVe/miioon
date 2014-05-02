'use strict';

angular.module('2ViVe')
  .factory('Profile', ['$http', 'CamelCaseLize',
    function($http, camelCaseLize) {

      function fetchProfile() {
        return $http.get('/api/v2/profile', {
          transformResponse: camelCaseLize
        })
          .then(function(resp) {
            Profile.data = resp.data.response;
            Profile.isLogin = true;
            return Profile.data;
          });
      }

      var Profile = {
        isLogin: false,
        fetch: fetchProfile
      };

      return Profile;
    }]);