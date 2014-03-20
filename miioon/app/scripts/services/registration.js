'use strict';

angular.module('2ViVe')
  .factory('Registration', ['$http', 'User',
    function($http, User) {
      var user = new User();
      return {
        validateSponsor: function(sponsorId) {
          return $http.get('/api/v2/registrations/sponsors/' + sponsorId, {
            headers: {
              'x-client-id': user.clientId,
              'x-client-secret': user.clientSecret
            }
          });
        }
      };
    }]);