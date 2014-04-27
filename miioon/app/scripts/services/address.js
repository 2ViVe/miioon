'use strict';

angular.module('2ViVe')
  .factory('Address', ['$http', '$q',
    function($http, $q) {

      function processFailures(failures) {
        var result = {};
        angular.forEach(failures, function(failure) {
          result[failure.code] = failure.message;
        });
        return result;
      }

      function validateShippingAddress() {
        var deferred = $q.defer(),
            promise = deferred.promise;

        $http
          .post('/api/v2/addresses/shipping/validate')
          .success(function(data) {
            (data.response.failures.length ? deferred.reject : deferred.resolve)(
              processFailures(data.response.failures)
            );
          })
          .error(function(data) {
            deferred.reject(data);
          });

        return promise;
      }

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
        },
        validateShippingAddressNew: validateShippingAddress
      };
    }]);
