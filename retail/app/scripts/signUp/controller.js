'use strict';
angular.module('miioon/signup')
  .controller('SignUpController', ['$scope', 'countries', 'Address', '$window', 'Registration',
    function($scope, countries, Address, $window, Registration) {

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

      function dummy() {
        $scope.account.sponsor = 100001;
        $scope.account.login = 'kiddzai';
        $scope.account.password = '!QAZ2w';
        $scope.confirmPassword = '!QAZ2w';
        $scope.account.email = 'kiddkaii@gmmmail.com';
        $scope.account.birthday = '1984-09-12';
        $scope.account.taxId = '123456789';
      }

      dummy();

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

      $scope.updateProducts = function(country) {
        Registration.getProducts(country.id)
          .success(function(data) {
            var products = data.response.products;
            $scope.products.data = products;
            $scope.products.selection = products;
          });
      };

      $scope.updateProducts($scope.account.country);


    }]);
