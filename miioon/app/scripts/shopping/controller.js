'use strict';

angular.module('2ViVe')
  .controller('ShoppingController', ['$scope', 'Shopping', 'Variants', 'User', '$location',
    function($scope, Shopping, Variants, User, $location) {
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
        return parseInt(total * 100) / 100;
      };

      $scope.$watch(function() {
        return Shopping.items;
      }, function() {
        Variants.getByIds(Shopping.getItemIds());
      });

      $scope.checkout = function() {
        if (User.isLogin) {
          $location.path('/checkout');
        } else {
          $location.path('/signin');
        }
      };
    }
  ]);