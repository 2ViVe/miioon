'use strict';

angular.module('2ViVe')
  .controller('ShoppingController', ['$scope', 'Shopping', 'Variants',
    function($scope, Shopping, Variants) {
      $scope.shopping = Shopping;
      $scope.$watch(function() {
        return Shopping.items;
      }, function() {
        Variants.getByIds(Shopping.getItemIds());
        $scope.variants = Variants;
      });
    }
  ]);