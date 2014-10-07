'use strict';

angular.module('miioon/party')
  .controller('PartyDetailsModalController', ['$scope', '$modalInstance', 'order',
    function($scope, $modalInstance, order) {

      $scope.order = order;
      $scope.shippingMethod = {};

      angular.forEach(order.availableShippingMethods, function(availableShippingMethod) {
        if (availableShippingMethod.id === order.shippingMethodId) {
          $scope.shippingMethod = availableShippingMethod;
        }
      });

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };

      $scope.totalPrice = function() {
        var adjustments = 0;
        angular.forEach(order.adjustments, function(adjustment) {
          adjustments += adjustment.amount;
        });
        return adjustments + order.itemTotal;
      };

    }]);