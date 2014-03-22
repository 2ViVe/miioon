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
  }]);