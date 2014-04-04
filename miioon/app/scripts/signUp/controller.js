'use strict';

angular.module('2ViVe')
  .controller('SignUpController', ['$scope', 'Registration', '$window',
    function($scope, Registration, $window) {
      $scope.currentStepNumber = 1;
      $scope.completedStepNumber = 1;
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
            var products = data.response.products;
            var entryProductIndex;
            angular.forEach(products, function(product, index) {
              if (product['taxon-id'] === 1) {
                product.quantity = 1;
                entryProductIndex = index;
              } else {
                product.quantity = 0;
              }
            });
            var entryProduct = products.splice(entryProductIndex, 1)[0];
            products.unshift(entryProduct);
            $scope.products = products;
          });
      };

      $scope.$on('CreateAccount', function() {
        $window.scrollTo(0, 0);
        Registration.create(
          $scope.payment['payment-method-id'],
          $scope.userInfo,
          null,
          $scope.address.homeAddress,
          $scope.address.shipmentAddress['shipping-method-id'],
          $scope.address.shipmentAddress,
          $scope.payment.billingAddress,
          null,
          $scope.payment['line-items']
        ).success(function(data) {
            $scope.currentStepNumber++;
            $scope.successInfo = data.response;
          });
      });

      $scope.$on('NextStep', function() {
        $window.scrollTo(0, 0);
        $scope.submitted = false;
        $scope.currentStepNumber++;
        if ($scope.currentStepNumber > $scope.completedStepNumber) {
          $scope.completedStepNumber = $scope.currentStepNumber;
        }
        if ($scope.currentStepNumber === 4) {
          Registration.orderSummary($scope.address.homeAddress, $scope.address.shipmentAddress, $scope.address.homeAddress, $scope.lineItems)
            .success(function(data) {
              $scope.payment = data.response;
              angular.forEach($scope.payment['available-shipping-methods'], function(availableShippingMethod) {
                if (availableShippingMethod.id === $scope.payment['shipping-method-id']) {
                  $scope.payment['shipping-method'] = availableShippingMethod.name;
                  return;
                }
              });
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

      $scope.paymentMethodChange = function(paymentMethodId) {
        angular.forEach($scope.payment['available-payment-methods'], function(availablePaymentMethod) {
          if (availablePaymentMethod.id === paymentMethodId) {
            $scope.payment['is-creditcard'] = availablePaymentMethod['is-creditcard'];
            $scope.payment['paymend-method'] = availablePaymentMethod.name;
            return;
          }
        });
      };
    }]);