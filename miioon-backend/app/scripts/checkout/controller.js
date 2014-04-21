'use strict';

angular.module('2ViVe')
  .controller('CheckoutController', ['$scope', 'Shopping', 'Variants',
    function($scope, Shopping, Variants) {
      $scope.shopping = Shopping;
      $scope.GrandTotal = function() {
        var total = 0;
        angular.forEach(Variants.data, function(variant) {
          total += variant.price * Shopping.getByItemId(variant.id).quantity;
        });
        return parseInt(total * 100) / 100;
      };
      $scope.variants = Variants;
      $scope.$watch(function() {
        return Shopping.items;
      }, function() {
        Variants.getByIds(Shopping.getItemIds());
      });
    }
  ]);