'use strict';

angular.module('2ViVe')
  .factory('Registration', ['$http',
    function($http) {
      return {
        validateSponsor: function(sponsorId) {
          return $http.get('/api/v2/registrations/sponsors', {
            params: {
              sponsorId: sponsorId
            }
          });
        }
      };
    }]);