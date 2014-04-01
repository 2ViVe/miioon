'use strict';

angular.module('2ViVe')
  .controller('SignUpController', ['$scope', 'Registration',
    function($scope, Registration) {
      $scope.currentStepNumber = 3;
      $scope.completedStepNumber = 4;
      $scope.shouldValidateRemotlyOnSubmit = false;
      $scope.isRemoteValidated = false;
      $scope.submitted = false;
      $scope.address = {};
      $scope.payment = {};
      $scope.userInfo = {};
      $scope.products = [];
      $scope.lineItems = [];

      $scope.registrationCountryChange = function(country) {
        Registration.getProducts(country.id)
          .success(function(data) {
            $scope.products = data.response.products;
          });
      };

      $scope.addProduct = function(isAdded, product) {
        if (isAdded) {
          $scope.lineItems.push(product);
        } else {
          var index = $scope.lineItems.indexOf(product);
          if (index > -1) {
            $scope.lineItems.splice(index, 1);
          }
        }
      };

      $scope.$on('CreateAccount', function() {
        Registration.create();
      });

      $scope.$on('NextStep', function() {
        $scope.submitted = false;
        $scope.currentStepNumber++;
        if ($scope.currentStepNumber > $scope.completedStepNumber) {
          $scope.completedStepNumber = $scope.currentStepNumber;
        }
        if ($scope.currentStepNumber === 4) {
          Registration.orderSummary($scope.address.homeAddress, $scope.address.shipmentAddress, $scope.address.homeAddress, $scope.lineItems)
            .success(function(data) {
              $scope.payment = data.response;
            });
        }
      });

      $scope.goToStep = function(stepNumber) {
        if (stepNumber <= $scope.completedStepNumber) {
          $scope.currentStepNumber = stepNumber;
        }
      };

      $scope.moreThanOld18 = function(date) {
        return moment(date).add(18, 'years').isBefore(moment());
      };

      $scope.getProducts = function() {
        Registration.getProducts($scope.userInfo.country.id);
      };
    }]);