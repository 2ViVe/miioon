'use strict';

angular.module('2ViVe')
  .controller('SignUpController', ['$scope', 'Registration', '$window', 'countries', 'User', '$modal',
    function($scope, Registration, $window, countries, User, $modal) {
      $scope.countries = countries;
      $scope.currentStepNumber = 1;
      $scope.shouldValidateRemotlyOnSubmit = false;
      $scope.isRemoteValidated = false;
      $scope.submitted = false;
      $scope.address = {};
      $scope.payment = {};
      $scope.userInfo = {};
      $scope.products = [];
      $scope.lineItems = [];
      $scope.creditcard = {};

      $scope.getCountryName = function(countryId) {
        var countryName = null;
        angular.forEach(countries, function(country) {
          if (country.id === countryId) {
            countryName = country.name;
            return null;
          }
        });
        return countryName;
      };

      $scope.getStateName = function(countryId, stateId) {
        var stateName = null;
        angular.forEach(countries, function(country) {
          if (country.id === countryId) {
            angular.forEach(country.states, function(state) {
              if (state.id === stateId) {
                stateName = state.name;
                return null;
              }
            });
            return null;
          }
        });
        return stateName;
      };

      $scope.registrationCountryChange = function(country) {
        Registration.getProducts(country.id)
          .success(function(data) {
            var products = data.response.products;
            var entryProductIndex;
            angular.forEach(products, function(product) {
              if (product['variant-id']) {
                product.quantity = 1;
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
          $scope.creditcard,
          $scope.address.homeAddress,
          $scope.address.shipmentAddress['shipping-method-id'],
          $scope.address.shipmentAddress,
          $scope.payment.billingAddress,
          $scope.payment['line-items']
        ).success(function(data) {
            if (data.response.order['payment-state'] === 'failed') {
              $scope.isFailed = true;
              return;
            }
            User.login($scope.userInfo.login, $scope.userInfo.password)
              .success(function() {
                User.fetch();
              });
            $scope.currentStepNumber++;
            $scope.successInfo = data.response;
          });
      });

      $scope.$on('NextStep', function() {
        $window.scrollTo(0, 0);
        $scope.submitted = false;
        $scope.currentStepNumber++;
        if ($scope.currentStepNumber === 4) {
          Registration.orderSummary($scope.address.homeAddress, $scope.address.shipmentAddress, $scope.address.homeAddress, $scope.lineItems)
            .success(function(data) {
              $scope.payment = data.response;
              var paymentMethod = data.response['available-payment-methods'][0];
              $scope.payment['payment-method-id'] = paymentMethod.id;
              $scope.payment['is-creditcard'] = paymentMethod['is-creditcard'];
              $scope.payment['paymend-method'] = paymentMethod.name;
              angular.forEach($scope.payment['available-shipping-methods'], function(availableShippingMethod) {
                if (availableShippingMethod.id === $scope.address.shipmentAddress['shipping-method-id']) {
                  $scope.payment['shipping-method'] = availableShippingMethod.name;
                  return null;
                }
              });

              Registration.orderAdjustments(
                $scope.address.shipmentAddress['shipping-method-id'], $scope.lineItems,
                $scope.address.homeAddress, $scope.address.shipmentAddress, $scope.address.homeAddress)
                .success(function(data) {
                  $scope.payment.adjustments = data.response;

                  var _adjustments = 0;
                  angular.forEach($scope.payment.adjustments, function(adjustment) {
                    _adjustments += adjustment.amount;
                  });
                  $scope.payment.total = _adjustments + $scope.payment['item-total'];
                });
            });

        }
      });

      $scope.goToStep = function(stepNumber) {
        if (stepNumber < $scope.currentStepNumber) {
          $scope.currentStepNumber = stepNumber;
        }
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

      $scope.showMailChimp = function() {
        $modal.open({
          templateUrl: 'views/sign-up/mail-chimp.html',
          controller: 'ChimpModalController',
          windowClass: 'medium',
          scope: $scope
        });
      };

    }])
    .controller('ChimpModalController', ['$scope', '$modalInstance',
      function($scope, $modalInstance) {
        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }
    ]);
