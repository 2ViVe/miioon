'use strict';

angular
  .module('2ViVe/report')
  .controller('CustomerOrderController', ['$scope', 'customers',
    function($scope, customers) {
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