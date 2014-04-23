'use strict';

angular.module('2ViVe')
  .controller('CheckoutController', ['$scope', 'Order', 'Shopping', 'User', '$location', 'LocalStorage',
    function($scope, Order, Shopping, User, $location, LocalStorage) {
      if (!User.isLogin) {
        LocalStorage.setPathAfterLogin('/checkout');
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
            $scope.selectedPaymentMethod = {};
            $scope.order = Order;
          });
      });

      $scope.placeOrder = function() {
        Order.create($scope.selectedPaymentMethod.id, $scope.selectedShippingMethodId);
      };
    }
  ]
);



