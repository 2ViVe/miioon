'use strict';

angular.module('2ViVe')
  .controller('CheckoutController', ['$scope', 'Order', 'Shopping', 'User', '$location', 'LocalStorage', '$modal',
    function($scope, Order, Shopping, User, $location, LocalStorage, $modal) {
      $scope.creditCard = {};

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

      $scope.editShippingAddress = function() {
        $modal.open({
          templateUrl: 'views/checkout/shipping-address.html',
          controller: 'ShippingModalController'
        }).result.then(function(shippingAddress) {
            $scope.order.data['shipping-address'] = shippingAddress;
          });
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


