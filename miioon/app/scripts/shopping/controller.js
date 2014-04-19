'use strict';

angular.module('2ViVe')
  .controller('ShoppingController', ['$scope', 'Shopping', 'Variants',
    function($scope, Shopping, Variants) {
      $scope.shopping = Shopping;
      $scope.update = function() {
        Shopping.update();
      };
      $scope.remove = function(variant) {
        Shopping.removeItem(variant.id).success(function() {
          Variants.remove(variant.id);
        });
      };
      $scope.$watch(function() {
        return Shopping.items;
      }, function() {
        Variants.getByIds(Shopping.getItemIds());
        $scope.variants = Variants;
      });
    }
  ]);