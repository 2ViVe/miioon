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
        },
        validateAvailabilities: function(key, value) {
          var params = {};
          params[key] = value;
          return $http.get('/api/v2/registrations/availabilities', {
            params: params,
            headers: {
              'x-client-id': user.clientId,
              'x-client-secret': user.clientSecret
            }
          });
        },
        create: function(paymentMethodId, userInfo, creditcard, homeAddress, shippingMethodId, shippingAddress, billingAddress, autoShipItems, lineItems, specialInstructions, orderNotes) {
          return $http.post('/api/v2/registrations', {
            'payment-method-id': paymentMethodId,
            'user-info': userInfo,
            'creditcard': creditcard,
            'home-address': homeAddress,
            'shipping-method-id': shippingMethodId,
            'shipping-address': shippingAddress,
            'billing-address': billingAddress,
            'autoship-items': autoShipItems,
            'line-items': lineItems,
            'special-instructions': specialInstructions,
            'order-notes': orderNotes
          }, {
            headers: {
              'x-client-id': user.clientId,
              'x-client-secret': user.clientSecret
            }
          });
        }
      };
    }]);