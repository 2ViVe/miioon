'use strict';
angular.module('miioon/signup')
  .controller('SignUpController', ['$scope', 'countries', 'Address', '$window',
    function($scope, countries, Address, $window) {
      $scope.stepNumber = 1;
      $scope.products = {
        data: {},
        selection: {}
      };
      $scope.method = {
        shipping: {},
        payment: {}
      };

      $scope.address = Address.createContainer()
        .addType('home').addType('shipping').addType('website');

      $scope.account = {
        country: countries.defaultCountry()
      };

      $scope.goToNextStep = function() {
        $window.scrollTo(0, 0);
        $scope.stepNumber++;
      };

      $scope.goToSuccess = function(successInfo) {
        $scope.successInfo = successInfo;
        $scope.stepNumber++;
      };

      $scope.countries = countries.data;

      $scope.goToStep = function(stepNumber) {
        if (stepNumber !== $scope.stepNumber) {
          $scope.stepNumber = stepNumber;
        }
      };

    }]);
