'use strict';

angular.module('2ViVe')
  .directive('registrationCountries', ['Registration',
    function(Registration) {
      return {
        restrict: 'A',
        controller: ['$scope', function($scope) {
          Registration.getCountries().success(function(countries) {
            $scope.countries = countries.response;
          });
        }]
      };
    }])
  .directive('countriesAndStates', ['Registration',
    function(Registration) {
      return {
        restrict: 'A',
        controller: ['$scope', function($scope) {
          Registration.getCountries().success(function(countries) {
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
        }]
      };
    }]);