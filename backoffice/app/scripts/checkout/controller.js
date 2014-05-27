'use strict';

angular
  .module('miioon/checkout')
  .controller('CheckoutController', ['$scope', 'order', 'Shopping', '$modal',
    function($scope, order, Shopping, $modal) {
      $scope.creditCard = {};
      $scope.placingOrder = false;
      $scope.isSucceed = false;
      $scope.isFailed = false;
      $scope.orderId = null;

      $scope.selectedShippingMethod = order.currentShippingMethod();
      $scope.selectedPaymentMethod = order.data['available-payment-methods'][0];
      $scope.order = order;

      $scope.editShippingAddress = function() {
        $modal.open({
          templateUrl: 'views/checkout/shipping-address.html',
          controller: 'ShippingModalController'
        }).result.then(function(shippingAddress) {
            $scope.order.data['shipping-address'] = shippingAddress;
            if ($scope.orderId) {
              order.updateShippingAddress($scope.orderId, shippingAddress)
                .success(function() {
                  order.adjustmentsWithOrderId($scope.orderId);
                });
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
              order.updateBillingAddress($scope.orderId, billingAddress);
            }
          });
      };

      $scope.totalPrice = function() {
        var adjustments = 0;
        angular.forEach(order.data.adjustments, function(adjustment) {
          adjustments += adjustment.amount;
        });
        return adjustments + order.data['item-total'];
      };

      $scope.changeShippingMethod = function(selectedShippingMethod) {
        $scope.selectedShippingMethod = selectedShippingMethod;

        if ($scope.orderId) {
          order.updateShippingAddress($scope.orderId, order.data['shipping-address'], selectedShippingMethod.id)
            .success(function() {
              order.adjustmentsWithOrderId($scope.orderId);
            });
          return null;
        }

        order.adjustments(selectedShippingMethod.id);
      };

      $scope.placeOrder = function() {
        $scope.placingOrder = true;

        if ($scope.selectedPaymentMethod['is-creditcard'] && !this.creditCardForm.$valid) {
          $scope.submitted = true;
          $scope.placingOrder = false;
          return;
        }

        order.create($scope.selectedPaymentMethod.id, $scope.selectedShippingMethod.id, $scope.creditCard)
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