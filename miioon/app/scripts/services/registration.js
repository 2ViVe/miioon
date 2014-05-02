'use strict';

angular.module('2ViVe')
  .factory('Registration', ['$http', '$q', '$rootScope',
    function($http, $q, $rootScope) {
      var countries = [];

      function fetchCountries() {
        var deferred = $q.defer(),
            promise = deferred.promise;

        countries.$promise = deferred.promise;

        countries.then = function(fn, errFn) {
          return promise.then(fn, errFn);
        };

        countries.catch = function(fn) {
          return promise.catch(fn);
        };

        if (!countries.length) {
          $http.get('/api/v2/registrations/countries')
            .success(function(ctx) {
              angular.forEach(ctx.response, function(country, idx) {
                countries[idx] = country;
              });
              deferred.resolve(countries);
            });
        }
        else {
          $rootScope.$evalAsync(function() {
            promise.resolve(countries);
          });

        }
        return countries;
      }

      function getShippingMethods(countryId, stateId) {
        return $http.get('/api/v2/registrations/orders/shipping-methods', {
          params: {
            'country-id': countryId,
            'state-id': stateId
          }
        });
      }

      function orderSummary(homeAddress, shippingAddress, billingAddress, lineItems, roleCode) {
        if (!roleCode) {
          roleCode = 'D';
        }
        var _lineItems = [];
        angular.forEach(lineItems, function(lineItem) {
          _lineItems.push({
            'variant-id': lineItem['variant-id'],
            'quantity': 1
          });
        });
        return $http.post('/api/v2/registrations/orders/summary', {
          'home-address': homeAddress,
          'shipping-address': shippingAddress,
          'billing-address': billingAddress,
          'line-items': _lineItems,
          'role-code': roleCode
        });
      }

      function getProducts(countryId, roleCode) {
        if (!roleCode) {
          roleCode = 'D';
        }
        return $http.get('/api/v2/registrations/products', {
          params: {
            'country-id': countryId,
            'role-code': roleCode
          }
        });
      }

      function create(paymentMethodId, userInfo, creditcard, homeAddress, shippingMethodId, shippingAddress, billingAddress, autoShipItems, lineItems, specialInstructions, orderNotes) {
        userInfo.sponsor = '136301';
        userInfo['role-code'] = 'D';

        return $http.post('/api/v2/registrations', {
          'payment-method-id': paymentMethodId,
          'user-info': userInfo,
          'creditcard': creditcard,
          'home-address': homeAddress,
          'shipping-method-id': shippingMethodId,
          'shipping-address': shippingAddress,
          'billing-address': billingAddress,
          //'autoship-items': autoShipItems,
          'line-items': lineItems
          //'special-instructions': specialInstructions,
          //'order-notes': orderNotes
        });
      }

      function createRetail(sponsor, login, password, email,  shippingAddress) {
        return $http.post('/api/v2/registrations/retail-customers', {
          sponsor: sponsor,
          login: login,
          password: password,
          email: email,
          'shipping-address': shippingAddress
        });
      }

      function validateAvailabilities(key, value) {
        var params = {};
        params[key] = value;
        return $http.get('/api/v2/registrations/availabilities', {
          params: params
        });
      }

      function validateSponsor(sponsorId) {
        return $http.get('/api/v2/registrations/sponsors/' + sponsorId);
      }

      function getCountries() {
        return $http.get('/api/v2/registrations/countries');
      }

      return {
        getShippingMethods: getShippingMethods,
        orderSummary: orderSummary,
        getProducts: getProducts,
        countries: fetchCountries,
        validateAvailabilities: validateAvailabilities,
        create: create,
        createRetail: createRetail,
        validateSponsor: validateSponsor,
        getCountries: getCountries
      };
    }]);