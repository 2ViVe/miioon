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
    'ipCookie',
    function($scope, $location, Registration, Address, User, Shopping, Taxons, LocalStorage, countries, ipCookie) {
      $scope.countries = countries.data;
      $scope.country = countries.defaultCountry();
      $scope.$errorMessages = {};
      $scope.state = {};

      var replicateSiteOwnerCookie = ipCookie('replicate-site-owner');
      $scope.sponsorId = '';
      if (replicateSiteOwnerCookie) {
        var replicateSiteOwner = replicateSiteOwnerCookie.slice(2,replicateSiteOwnerCookie.length);
        replicateSiteOwner = JSON.parse(replicateSiteOwner);
        $scope.sponsorId = replicateSiteOwner['distributor-id'];
      }

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