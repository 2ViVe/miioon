'use strict';

angular.module('2ViVe')
  .controller('RetailSignUpController', [
    '$scope',
    'Registration',
    'Address',
    function($scope, Registration, Address) {

      $scope.countries = Registration.countries();
      $scope.$errorMessages = {};

      $scope.register = function() {
        $scope.retailSignupForm = $scope.retailSignupForm || {};

        var shippingAddress = {
          'first-name': $scope.firstName,
          'last-name': $scope.lastName,
          'stree': $scope.firstAddressLine,
          'stree-cont': $scope.secondAddressLine,
          'city': $scope.city,
          'zip': $scope.zip,
          'state-id': $scope.state.id,
          'country-id': $scope.city.id,
          'phone': $scope.phoneNumber
        };

        if ($scope.retailSignupForm.$valid) {
          Address
            .validateShippingAddressNew(shippingAddress)
            .then(function() {
              return Registration.createRetail(
                $scope.sponsorId,
                $scope.login,
                $scope.password,
                $scope.email,
                shippingAddress
              );
            });
        }
      };


    }
  ]);