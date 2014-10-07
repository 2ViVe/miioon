'use strict';

angular.module('miioonApp')
  .controller('OrderReportDetailController', ['$scope', 'order', '$modalInstance',
    function($scope, order, $modalInstance) {
      $scope.order = order;

      angular.forEach(order.availableShippingMethods, function(shippingMethod) {
        if (shippingMethod.id === order.shippingMethodId) {
          $scope.shippingMethod = shippingMethod;
          return null;
        }
      });

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }]);
