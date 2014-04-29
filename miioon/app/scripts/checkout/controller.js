'use strict';

angular.module('2ViVe')
  .controller('CheckoutController', ['$scope', 'Order', 'Shopping', 'User', '$location', 'LocalStorage', '$modal',
    function($scope, Order, Shopping, User, $location, LocalStorage, $modal) {
      $scope.creditCard = {};

      if (!User.isLogin) {
        $location.path('/signin');
      }

      $scope.$watch(function() {
        return Shopping.items;
      }, function() {
        if (!Shopping.items) {
          return;
        }
        Order.checkout(Shopping.items)
          .success(function() {
            $scope.selectedShippingMethodId = Order.data['shipping-method-id'];
            $scope.selectedPaymentMethod = Order.data['available-payment-methods'][0];
            $scope.order = Order;
          });
      });

      $scope.editShippingAddress = function() {
        $modal.open({
          templateUrl: 'views/checkout/shipping-address.html',
          controller: 'ShippingModalController'
        }).result.then(function(shippingAddress) {
            $scope.order.data['shipping-address'] = shippingAddress;
          });
      };

      $scope.editBillingAddress = function() {
        $modal.open({
          templateUrl: 'views/checkout/billing-address.html',
          controller: 'BillingModalController'
        }).result.then(function(BillingAddress) {
            $scope.order.data['billing-address'] = BillingAddress;
          });
      };

      $scope.changeShippingMethod = function() {
        Order.adjustments($scope.selectedShippingMethodId);
      };

      $scope.placeOrder = function() {
        if ($scope.selectedPaymentMethod['is-creditcard']) {
          $scope.submitted = true;
          if ($scope.creditCardForm.$valid) {
            Order.create($scope.selectedPaymentMethod.id, $scope.selectedShippingMethodId, $scope.creditCard);
          }
        } else {
          Order.create($scope.selectedPaymentMethod.id, $scope.selectedShippingMethodId);
        }
      };
    }
  ]
);



