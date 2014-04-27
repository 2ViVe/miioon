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
    'ngProgress',
    function($scope, $location, Registration, Address, User, Shopping, Taxons, LocalStorage, ngProgress) {
      $scope.countries = Registration.countries();
      $scope.$errorMessages = {};
      $scope.country = {};
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
          ngProgress.start();
          ngProgress.stop(30);
          Address
            .validateShippingAddressNew(getShippingAddress())
            .then(createUser)
            .then(login)
            .catch(function(failures) {
              $scope.$shippingAddressErrors = failures;
              ngProgress.complete();
            });
        }
      };

      function createUser() {
        ngProgress.set(60);
        return Registration.createRetail(
          $scope.sponsorId,
          $scope.login,
          $scope.password,
          $scope.email,
          getShippingAddress()
        );
      }

      function redirectBack() {
        User.fetch().success(function() {
          if (Shopping.items) {
            Shopping.mergeItems();
          } else {
            Shopping.fetchForUser();
          }
          ngProgress.complete();
        });
        Taxons.fetch();

        $location.path(LocalStorage.getPathAfterLogin());
        LocalStorage.removePathAfterLogin();
      }

      function login() {
        User.login($scope.login, $scope.password)
          .success(redirectBack);
      }
    }
  ]);