'use strict';

angular.module('2ViVe')
  .factory('Country', ['$http',
    function($http) {
      return {
        list: function() {
          return $http.get('/api/v2/countries')
            .success(function(countries) {
              var countriesWithStates = [];
              angular.forEach(countries.response, function(country) {
                if (country.states.length > 0) {
                  countriesWithStates.push(country);
                }
              });
              countries.response = countriesWithStates;
            });
        }
      };
    }]);