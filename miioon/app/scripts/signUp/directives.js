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
    }])
  .directive('datePicker', function() {
    return {
      restrict: 'C',
      link: function(scope, element) {
        var maxDate = moment().add(-18, 'years');
        var minDate = moment().add(-150, 'years');

        new Pikaday({
          field: angular.element(element)[0],
          yearRange: [minDate.year(), maxDate.year()],
          defaultDate: moment().add(-30, 'years').toDate(),
          minDate: minDate.toDate(),
          maxDate: maxDate.toDate()
        });
      }
    }
  });