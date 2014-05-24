'use strict';

angular.module('2ViVe')
  .controller('SignUpController', ['$scope', 'Registration', '$window', 'countries', 'User', '$modal', 'UrlHandler',
    function($scope, Registration, $window, countries, User, $modal, UrlHandler) {
      function updateProducts(country) {
        Registration.getProducts(country.id)
          .success(function(data) {
            var products = data.response.products;
            angular.forEach(products, function(product) {
              if (product['variant-id']) {
                product.quantity = 1;
              }
            });
            $scope.products = products;
          });
      }

      $scope.retailUrl = UrlHandler.retailUrl();
      $scope.countries = countries.data;
      $scope.currentStepNumber = 1;
      $scope.shouldValidateRemotlyOnSubmit = false;
      $scope.isRemoteValidated = false;
      $scope.submitted = false;
      $scope.payment = {};
      var defaultCountry = countries.defaultCountry();
      $scope.userInfo = {
        country: defaultCountry
      };
      $scope.address = {
        homeAddress: {
          country: defaultCountry
        },
        shipmentAddress: {
          country: defaultCountry,
          state: '',
          'first-name': '',
          'last-name': '',
          street: '',
          'street-contd': '',
          city: '',
          zip: '',
          phone: ''
        }
      };
      updateProducts($scope.userInfo.country);
      $scope.products = [];
      $scope.lineItems = [];
      $scope.creditcard = {};

      $scope.getCountryName = function(countryId) {
        var countryName = null;
        angular.forEach(countries.data, function(country) {
          if (country.id === countryId) {
            countryName = country.name;
            return null;
          }
        });
        return countryName;
      };

      $scope.getStateName = function(countryId, stateId) {
        var stateName = null;
        angular.forEach(countries.data, function(country) {
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
        updateProducts(country);
        $scope.address.homeAddress.country = country;
        $scope.address.shipmentAddress.country = country;
      };

      $scope.$on('CreateAccount', function() {
        $window.scrollTo(0, 0);

        var homeAddressData = angular.copy($scope.address.homeAddress);
        homeAddressData['country-id'] = homeAddressData.country.id;
        delete homeAddressData.country;
        homeAddressData['state-id'] = homeAddressData.state.id;
        delete homeAddressData.state;

        var shipmentAddressData = angular.copy($scope.address.shipmentAddress);
        shipmentAddressData['country-id'] = shipmentAddressData.country.id;
        delete shipmentAddressData.country;
        shipmentAddressData['state-id'] = shipmentAddressData.state.id;
        delete shipmentAddressData.state;

        var billingAddressData = angular.copy($scope.payment.billingAddress);
        billingAddressData['country-id'] = billingAddressData.country.id;
        delete billingAddressData.country;
        billingAddressData['state-id'] = billingAddressData.state.id;
        delete billingAddressData.state;

        Registration.create(
          $scope.payment['payment-method-id'],
          $scope.userInfo,
          $scope.creditcard,
          homeAddressData,
          $scope.address.shipmentAddress['shipping-method-id'],
          billingAddressData,
          billingAddressData,
          $scope.payment['line-items'],
          $scope.address.webAddress
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
          var homeAddressData = angular.copy($scope.address.homeAddress);
          homeAddressData['country-id'] = homeAddressData.country.id;
          delete homeAddressData.country;
          homeAddressData['state-id'] = homeAddressData.state.id;
          delete homeAddressData.state;

          var shipmentAddressData = angular.copy($scope.address.shipmentAddress);
          shipmentAddressData['country-id'] = shipmentAddressData.country.id;
          delete shipmentAddressData.country;
          shipmentAddressData['state-id'] = shipmentAddressData.state.id;
          delete shipmentAddressData.state;
          Registration.orderSummary(homeAddressData, shipmentAddressData, homeAddressData, $scope.lineItems, $scope.address.webAddress)
            .success(function(data) {
              $scope.payment = data.response;
              $scope.payment.billingAddress = data.response['billing-address'];
              $scope.payment.billingAddress['street-contd'] = $scope.address.homeAddress['street-contd'];
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
                homeAddressData, shipmentAddressData, homeAddressData)
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
