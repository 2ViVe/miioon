'use strict';

angular.module('2ViVe')
  .factory('Address', ['$http', 'User',
    function($http, User) {
      var user = new User();
      return {
        validateHomeAddress: function(homeAddress) {
          return $http.post('/api/v2/addresses/home/validate', homeAddress, {
            headers: {
              'x-client-id': user.clientId,
              'x-client-secret': user.clientSecret
            }
          });
        },
        validateWebAddress: function(webAddress) {
          return $http.post('/api/v2/addresses/website/validate', webAddress, {
            headers: {
              'x-client-id': user.clientId,
              'x-client-secret': user.clientSecret
            }
          });
        },
        validateShippingAddress: function(shippingAddress) {
          return $http.post('/api/v2/addresses/shipping/validate', shippingAddress, {
            headers: {
              'x-client-id': user.clientId,
              'x-client-secret': user.clientSecret
            }
          });
        }
      };
    }]);