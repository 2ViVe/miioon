'use strict';

angular.module('2ViVe')
  .controller('CheckoutController', ['$scope', 'Order', 'Shopping', 'User', '$location', 'LocalStorage', '$modal',
    function($scope, Order, Shopping, User, $location, LocalStorage, $modal) {
      $scope.creditCard = {};
      $scope.placingOrder = false;
      $scope.isSucceed = false;
      $scope.isFailed = false;
      $scope.orderId = null;

      User.fetch().catch(function() {
        if (User.isLogin === false) {
          $location.path('/signin');
        }
      });

      User.fetch()
        .then(function() {
          Shopping.fetch()
            .then(function(data) {
              Order.checkout(data['line-items'])
                .success(function() {
                  $scope.selectedShippingMethod = Order.currentShippingMethod();
                  $scope.selectedPaymentMethod = Order.data['available-payment-methods'][0];
                  $scope.order = Order;
                });
            });
        })
        .catch(function() {
          if (User.isLogin === false) {
            $location.path('/signin');
          }
        });

      $scope.editShippingAddress = function() {
        $modal.open({
          templateUrl: 'views/checkout/shipping-address.html',
          controller: 'ShippingModalController'
        }).result.then(function(shippingAddress) {
            $scope.order.data['shipping-address'] = shippingAddress;
            if ($scope.orderId) {
              Order.updateShippingAddress($scope.orderId, shippingAddress);
            }
          });
      };

      $scope.editBillingAddress = function() {
        $modal.open({
          templateUrl: 'views/checkout/billing-address.html',
          controller: 'BillingModalController'
        }).result.then(function(billingAddress) {
            $scope.order.data['billing-address'] = billingAddress;
            if ($scope.orderId) {
              Order.updateBillingAddress($scope.orderId, billingAddress);
            }
          });
      };

      $scope.totalPrice = function() {
        var adjustments = 0;
        angular.forEach(Order.data.adjustments, function(adjustment) {
          adjustments += adjustment.amount;
        });
        return adjustments + Order.data['item-total'];
      };

      $scope.changeShippingMethod = function(selectedShippingMethod) {
        $scope.selectedShippingMethod = selectedShippingMethod;

        if ($scope.orderId) {
          Order.changeShippingMethod($scope.orderId, selectedShippingMethod.id)
            .success(function() {
              Order.adjustmentsWithOrderId($scope.orderId);
            });
          return null;
        }

        Order.adjustments(selectedShippingMethod.id);
      };

      $scope.placeOrder = function() {
        $scope.placingOrder = true;

        if ($scope.selectedPaymentMethod['is-creditcard'] && !this.creditCardForm.$valid) {
          $scope.submitted = true;
          $scope.placingOrder = false;
          return;
        }

        Order.create($scope.selectedPaymentMethod.id, $scope.selectedShippingMethod.id, $scope.creditCard)
          .success(function(data) {
            $scope.placingOrder = false;
            $scope.orderId = data.response['order-id'];

            if (data.response['payment-state'] === 'failed') {
              $scope.isFailed = true;
              $scope.failedMessage = 'Process order failed, please check your payment information.';
              return;
            }
            $scope.isSucceed = true;
            $scope.successInfo = data.response;
            Shopping.deleteAll();
          })
          .error(function(data) {
            $scope.placingOrder = false;
            $scope.isFailed = true;
            $scope.failedMessage = data.meta.error.message;
          });
      };
    }
  ]
);



