'use strict';

angular.module('2ViVe')
  .controller('RetailSignUpController', [
    '$scope',
    '$location',
    'Registration',
    'Address',
    'User',
    'Shopping',
    'Taxons',
    'LocalStorage',
    'countries',
    function($scope, $location, Registration, Address, User, Shopping, Taxons, LocalStorage, countries) {
      $scope.countries = countries.data;
      $scope.country = countries.defaultCountry();
      $scope.$errorMessages = {};
      $scope.state = {};

      function getShippingAddress() {
        return {
          'first-name': $scope.firstName,
          'last-name': $scope.lastName,
          'street': $scope.firstAddressLine,
          'street-cont': $scope.secondAddressLine,
          'city': $scope.city,
          'zip': $scope.zip,
          'state-id': $scope.state.id,
          'country-id': $scope.country.id,
          'phone': $scope.phoneNumber
        };
      }

      $scope.register = function() {
        $scope.retailSignupForm = $scope.retailSignupForm || {};
        $scope.submitted = true;

        if ($scope.retailSignupForm.$valid) {
          Address
            .validateShippingAddressNew(getShippingAddress())
            .then(createUser)
            .then(login)
            .catch(function(failures) {
              $scope.$shippingAddressErrors = failures;
            });
        }
      };

      function createUser() {
        return Registration.createRetail(
          $scope.sponsorId,
          $scope.login,
          $scope.password,
          $scope.email,
          getShippingAddress()
        );
      }

      function redirectBack() {
        $location.url(LocalStorage.getPathAfterLogin());
        LocalStorage.removePathAfterLogin();
      }

      function login() {
        User.login($scope.login, $scope.password, 'on')
          .success(redirectBack);
      }
    }
  ]);