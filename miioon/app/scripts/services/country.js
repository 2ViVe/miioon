'use strict';

angular.module('2ViVe')
  .factory('Country', ['$http',
    function($http) {
      return {
        list: function() {
          return $http.get('/api/v2/countries');
        }
      };
    }]);