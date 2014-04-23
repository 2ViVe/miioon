'use strict';

angular.module('2ViVe')
  .controller('RetailSignUpController', [
    '$scope',
    'Registration',
    function($scope, Registration) {
      $scope.countries = Registration.countries();

      $scope.register = function() {
        $scope.retailSignupForm = $scope.retailSignupForm || {};
        if ($scope.retailSignupForm.$valid) {
          Registration.createRetail(
            $scope.sponsor,
            $scope.login,
            $scope.password,
            $scope.email,
            {
              'first-name': $scope.firstName,
              'last-name': $scope.lastName,
              'stree': $scope.firstAddressLine,
              'stree-cont': $scope.secondAddressLine,
              'city': $scope.city,
              'zip': $scope.zip,
              'state-id': $scope.state.id,
              'country-id': $scope.city.id,
              'phone': $scope.phoneNumber
            }
          );
        }
      };
    }
  ]);