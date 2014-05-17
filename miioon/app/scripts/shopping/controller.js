'use strict';

angular.module('2ViVe')
  .controller('ShoppingController', ['$scope', 'shopping', 'Variants',
    function($scope, shopping, Variants) {
      $scope.shopping = shopping;
      $scope.variants = Variants;

      $scope.update = function() {
        shopping.update();
      };

      $scope.remove = function(variant) {
        shopping.removeItem(variant.id).success(function() {
          Variants.remove(variant.id);
        });
      };

      $scope.GrandTotal = function() {
        var total = 0;
        angular.forEach(shopping.items, function(item) {
          var variant = Variants.getById(item['variant-id']);
          if (variant) {
            total += variant.price * item.quantity;
          }
        });
        return total;
      };

      Variants.getByIds(shopping.getItemIds());

      $scope.checkout = function() {
        shopping.checkout();
      };

      $scope.empty = function() {
        shopping.empty();
      };

      $scope.continueShopping = function() {
        shopping.continueShopping();
      };
    }
  ]);