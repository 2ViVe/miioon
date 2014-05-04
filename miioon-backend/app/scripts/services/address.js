'use strict';

angular.module('2ViVe')
  .factory('Address', ['$http', 'CamelCaseLize', function($http, camelCaselize) {

    var API_URL = '/api/v2/addresses';

    var address,
        needCache = false;

    function Address(data) {
      angular.extend(this, data);
    }

    function fetchAddress() {
      return $http.get(API_URL, {
        transformResponse: camelCaselize,
        cache: needCache
      }).then(function(resp) {
        needCache = true;
        address = address ? angular.extend(address, resp.data.response) : new Address(resp.data.response);
        return address;
      });
    }

    return {
      fetch: fetchAddress
    };
  }]);
