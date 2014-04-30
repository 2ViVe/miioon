'use strict';

angular.module('2ViVe')
  .controller('CheckoutController', ['$scope', 'Order', 'Shopping', 'User', '$location', 'LocalStorage', '$modal',
    function($scope, Order, Shopping, User, $location, LocalStorage, $modal) {
      $scope.creditCard = {};
      $scope.placingOrder = false;
      $scope.isSucceed = false;

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
            $scope.selectedShippingMethod = Order.currentShippingMethod();
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

      $scope.changeShippingMethod = function(selectedShippingMethod) {
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
            $scope.isSucceed = true;
            $scope.successInfo = data.response;
            $scope.placingOrder = false;
          });
      };
    }
  ]
);



