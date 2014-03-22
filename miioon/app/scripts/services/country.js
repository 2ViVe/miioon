'use strict';

angular.module('2ViVe')
  .factory('Country', ['$http', 'User',
    function($http, User) {
      var user = new User();
      return {
        list: function() {
          return $http.get('/api/v2/countries', {
            headers: {
              'x-client-id': user.clientId,
              'x-client-secret': user.clientSecret
            }
          });
        }
      };
    }]);