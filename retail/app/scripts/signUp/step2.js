'use strict';

angular.module('miioon/signup')
  .directive('signUpStep2', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {
        $scope.nextStep = function() {
          if (this.step2.$valid) {
            $scope.lineItems.splice(0, $scope.lineItems.length);
            angular.forEach($scope.products, function(product) {
              if (product.quantity > 0) {
                $scope.lineItems.push({
                  'variant-id': product['variant-id'],
                  'quantity': product.quantity
                });
              }
            });
            $scope.goToNextStep();
          }
        };
      }]
    };
  }]);