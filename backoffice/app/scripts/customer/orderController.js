'use strict';

angular
  .module('2ViVe/report')
  .controller('CustomerOrderController', ['$scope', 'customers', '$modal', 'Order',
    function($scope, customers, $modal, Order) {
      $scope.customers = customers;
      var _limit = 25;

      $scope.updateOrderAndRefreshPagination = function() {
        customers.fetchOrders(0, _limit, $scope.distributorId)
          .then(function() {
            $scope.refreshPagination(customers.orders.pagination.count);
          });
      };

      $scope.clearDistributorId = function() {
        $scope.distributorId = '';
        customers.fetchOrders(0, _limit)
          .then(function() {
            $scope.refreshPagination(customers.orders.pagination.count);
          });
      };

      $scope.showDetail = function(number) {
        $modal.open({
          templateUrl: 'views/report/order-detail.html',
          controller: 'OrderReportDetailController',
          resolve: {
            order: function() {
              return Order.detail(number);
            }
          }
        });
      };

      $scope.goToPage = function(page, offset, limit) {
        _limit = limit;
        customers.fetchOrders(offset, limit)
          .then(function() {
            $scope.refreshPagination(customers.orders.pagination.count);
          });
      };
    }
  ]
);
