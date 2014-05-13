'use strict';

angular.module('miioonApp')
  .controller('OrderReportController', ['$scope', 'Order',
    function($scope, Order) {
      Order.recent(0, 25).then(function(data) {
        $scope.orders = data;
      });
    }]);
