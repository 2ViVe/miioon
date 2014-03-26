'use strict';

angular.module('2ViVe')
  .directive('registrationCountries', ['Registration',
    function(Registration) {
      return {
        restrict: 'A',
        controller: function($scope) {
          Registration.getCountries().success(function(countries) {
            $scope.countries = countries.response;
          });
        }
      };
    }])
  .directive('countriesAndStates', ['Country',
    function(Country) {
      return {
        restrict: 'A',
        controller: function($scope) {
          Country.list().success(function(countries) {
            $scope.countries = countries.response;
          });
          $scope.onCountryChanged = function(selectedCountryId) {
            angular.forEach($scope.countries, function(country) {
              if (country.id === selectedCountryId) {
                $scope.states = country.states;
                return;
              }
            });
          };
        }
      };
    }]);