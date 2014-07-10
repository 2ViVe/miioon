'use strict';

angular.module('miioon/shopping')
  .controller('ShoppingController', ['$scope', 'shopping',
    function($scope, shopping) {
      $scope.shopping = shopping;

      $scope.update = function() {
        shopping.update();
      };

      $scope.remove = function(item) {
        shopping.removeItem(item);
      };

      $scope.GrandTotal = function() {
        var total = 0;
        angular.forEach(shopping.items, function(item) {
          if (item.data) {
            total += item.data.price * item.quantity;
          }
        });
        return total;
      };

      $scope.empty = function() {
        shopping.empty();
      };

      $scope.continueShopping = function() {
        shopping.continueShopping();
      };
    }
  ]);
