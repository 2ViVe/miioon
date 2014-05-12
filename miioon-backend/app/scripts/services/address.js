'use strict';

angular.module('2ViVe')
  .factory('Address', ['$http', '$q', 'CamelCaseLize', 'Dashlize',
    function($http, $q, camelCaselize, dashlize) {

      var API_URL = '/api/v2/addresses';

      var address,
        needCache = false,
        proto;

      function Address(data) {

        this.home = {};
        this.billing = {};
        this.website = {};
        this.shipping = {};

        this.extend(data);
      }

      proto = Address.prototype;

      proto.extend = function(address) {
        var self = this;
        angular.forEach(['home', 'billing', 'shipping', 'website'], function(type) {

          self[type].update = function() {
            return self.update(type, self[type]);
          };

          if (!address[type]) {
            return;
          }
          angular.extend(self[type], address[type]);
        });

        return this;
      };

      proto.validate = function(type, data) {
        function validateHandler(response) {
          var failures = response.data.response.failures;
          if (failures && Object.keys(failures).length) {
            failures = failuresToObject(failures);
            address[type].errors = failures;
            deferred.reject(failures);
          }
          else {
            delete address[type].errors;
            deferred.resolve(failures);
          }
        }

        var deferred = $q.defer();
        $http.post(API_URL + '/' + type + '/validate', data, {
          transformRequest: function(data) {
            return angular.toJson(dashlize(data));
          },
          transformResponse: camelCaselize
        }).then(validateHandler);
        
        return deferred.promise;
      };

      function failuresToObject(failures) {
        var result = {};
        angular.forEach(failures, function(failure) {
          result[failure.field] = failure.message;
        });

        return camelCaselize(result);
      }

      proto.update = function(type, data) {
        var self = this;

        return self.validate(type, data)
          .then(function() {
            return $http
              .post(API_URL + '/' + type, data, {
                transformRequest: function(data) {
                  return angular.toJson(dashlize(data));
                },
                transformResponse: camelCaselize
              });
          })
          .then(function(resp) {
            var data = resp.data.response;
            angular.extend(self[type], data);
            return data;
          });
      };

      function fetchAddress() {
        return $http.get(API_URL, {
          transformResponse: camelCaselize,
          cache: needCache
        }).then(function(resp) {
          needCache = true;
          address = address ? address.extend(resp.data.response) : new Address(resp.data.response);
          return address;
        });
      }

      return {
        fetch: fetchAddress
      };
    }]);
