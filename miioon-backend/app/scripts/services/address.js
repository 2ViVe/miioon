'use strict';

angular.module('2ViVe')
  .factory('Address', ['$http', 'CamelCaseLize', 'Dashlize',
    function($http, camelCaselize, dashlize) {

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

        self[type]['update'] = function() {
          return self.update(type, self[type]);
        };

        if (!address[type]) {
          return;
        }
        angular.extend(self[type], address[type]);
      });

      return this;
    };

    proto.update = function(type, data) {
      var self = this;
      return $http
                .post(API_URL + '/' + type, data, {
                  transformRequest: function(data)  { return angular.toJson(dashlize(data)); },
                  transformResponse: camelCaselize
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
