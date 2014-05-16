'use strict';

angular.module('2ViVe')
  .controller('ShoppingController', ['$scope', 'Shopping', 'Variants', 'User',
    function($scope, Shopping, Variants, User) {
      $scope.shopping = Shopping;
      $scope.variants = Variants;

      $scope.update = function() {
        Shopping.update();
      };

      $scope.remove = function(variant) {
        Shopping.removeItem(variant.id).success(function() {
          Variants.remove(variant.id);
        });
      };

      $scope.GrandTotal = function() {
        var total = 0;
        angular.forEach(Variants.data, function(variant) {
          total += variant.price * Shopping.getByItemId(variant.id).quantity;
        });
        return total;
      };

      User.fetch().then(function() {
        Shopping.fetch().then(function() {
          Variants.getByIds(Shopping.getItemIds());
        });
      });

      $scope.checkout = function() {
        Shopping.checkout();
      };

      $scope.empty = function() {
        Shopping.empty();
      };

      $scope.continueShopping = function() {
        Shopping.continueShopping();
      };
    }
  ]);