'use strict';

angular.module('2ViVe')
  .factory('Address', ['$http', '$q', function ($http, $q) {

    var SHIPPING_ADDRESS_VALIDATE_URL = '/api/v2/addresses/shipping/validate',
        BILLING_ADDRESS_VALIDATE_URL = '/api/v2/addresses/billing/validate',
        WEB_ADDRESS_VALIDATE_URL = '/api/v2/addresses/website/validate',
        HOME_ADDRESS_VALIDATE_URL = '/api/v2/addresses/home/validate';

    function processFailures(failures) {
      var result = {};
      angular.forEach(failures, function (failure) {
        result[failure.code] = failure.message;
      });
      return result;
    }

    function validateAddressWithUrl(url) {
      function validateAddress(address) {

        var deferred = $q.defer(),
            promise = deferred.promise;
        $http
          .post(url, address)
          .success(function (data) {
            (data.response.failures.length ? deferred.reject : deferred.resolve)(
              processFailures(data.response.failures)
            );
          })
          .error(function (data) {
            deferred.reject(data);
          });

        return promise;
      }

      return validateAddress;
    }



    return {
      // will be deprecated - zekai
      validateHomeAddress: function (homeAddress) {
        return $http.post('/api/v2/addresses/home/validate', homeAddress);
      },
      validateWebAddress: function (webAddress) {
        return $http.post('/api/v2/addresses/website/validate', webAddress);
      },
      validateShippingAddress: function (shippingAddress) {
        return $http.post('/api/v2/addresses/shipping/validate', shippingAddress);
      },
      validateBillingAddress: function (billingAddress) {
        return $http.post('/api/v2/addresses/billing/validate', billingAddress);
      },

      validateShippingAddressNew: validateAddressWithUrl(SHIPPING_ADDRESS_VALIDATE_URL),
      validateBillingAddressNew: validateAddressWithUrl(BILLING_ADDRESS_VALIDATE_URL),
      validateWebAddressNew: validateAddressWithUrl(WEB_ADDRESS_VALIDATE_URL),
      validateHomeAddressNew: validateAddressWithUrl(HOME_ADDRESS_VALIDATE_URL)
    };
  }]);

