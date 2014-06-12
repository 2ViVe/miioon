'use strict';

angular.module('2ViVe')
  .directive('countriesAndStates', ['Registration', 'DEFAULT_COUNTRY_ID',
    function(Registration, DEFAULT_COUNTRY_ID) {
      return {
        restrict: 'A',
        controller: ['$scope', function($scope) {
          $scope.defailtCountryId = DEFAULT_COUNTRY_ID;

          Registration.countries().then(function(result) {
            $scope.countries = result;
            $scope.onCountryChanged($scope.defailtCountryId);
          });

          $scope.getStates = function(selectedCountryId) {
            angular.forEach($scope.countries, function(country) {
              if (country.id === selectedCountryId) {
                $scope.states = country.states;
                return;
              }
            });
            return $scope.states;
          };

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
  .directive('creditCardExpiration', function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {
        $scope.expirationYears = [];
        $scope.expirationMonths = [];
        var currentYear = moment().year();
        var maxYear = currentYear + 20;
        for(var year = currentYear; year < maxYear; year++) {
          $scope.expirationYears.push(year);
        }
        for(var month = 1; month < 13; month++) {
          $scope.expirationMonths.push(month);
        }
      }]
    };
  })
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
    };
  });