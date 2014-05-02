'use strict';

angular.module('2ViVe')
  .factory('Address', ['$http', 'CamelCaseLize', function($http, camelCaselize) {

    var API_URL = '/v2/addresses';


    function fetchAddress() {
      return $http.get(API_URL, {
        transformResponse: camelCaselize
      }).then(function(resp) {
        return resp.data;
      });
    }

    return {
      fetch: fetchAddress
    };
  }]);
