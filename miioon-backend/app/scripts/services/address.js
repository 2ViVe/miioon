'use strict';

angular.module('2ViVe')
  .factory('Address', ['$http', 'CamelCaseLize', function($http, camelCaselize) {

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
      angular.forEach(['home', 'billing', 'shipping', 'website'], function(type) {
        if (!address[type]) {
          return;
        }
        angular.extend(this[type], address[type]);
      }, this);

      return this;
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
