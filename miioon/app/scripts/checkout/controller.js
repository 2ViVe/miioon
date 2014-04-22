'use strict';

angular.module('2ViVe')
  .controller('CheckoutController', ['$scope', 'Order', 'Shopping',
    function($scope, Order, Shopping) {

      $scope.$watch(function() {
        return Shopping.items;
      }, function() {
        if (!Shopping.items) {
          return;
        }
        Order.checkout(Shopping.items)
          .success(function() {
            $scope.selectedShippingMethod = Order.data['shipping-method-id'];
            $scope.order = Order;
          });
      });
    }
  ]
);



