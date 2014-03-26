'use strict';

angular.module('2ViVe')
  .factory('Address', ['$http',
    function($http) {
      return {
        validateHomeAddress: function(homeAddress) {
          return $http.post('/api/v2/addresses/home/validate', homeAddress);
        },
        validateWebAddress: function(webAddress) {
          return $http.post('/api/v2/addresses/website/validate', webAddress);
        },
        validateShippingAddress: function(shippingAddress) {
          return $http.post('/api/v2/addresses/shipping/validate', shippingAddress);
        },
        validateBillingAddress: function(billingAddress) {
          return $http.post('/api/v2/addresses/billing/validate', billingAddress);
        }
      };
    }]);