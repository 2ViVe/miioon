'use strict';

angular.module('miioonApp')
  .controller('OrderReportController', ['$scope', 'orders', '$modal',
    function($scope, orders, $modal) {
      $scope.orders = orders;

      $scope.viewDetail = function(id) {
        $modal.open({
          templateUrl: 'views/report/order-detail.html',
          controller: 'OrderReportDetailController',
          resolve: {
            'order': ['Order', function(Order) {
              return Order.detail(id);
            }]
          }
        });
      };
    }]);
