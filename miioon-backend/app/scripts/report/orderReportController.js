'use strict';

angular.module('miioonApp')
  .controller('OrderReportController', ['$scope', 'Order', '$modal',
    function($scope, Order, $modal) {
      Order.recent(0, 25).then(function(data) {
        $scope.orders = data;
      });

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
