'use strict';

angular
  .module('2ViVe/report')
  .controller('CustomerDetailController', ['$scope', 'customers', '$modalInstance', 'customer',
    function($scope, customers, $modalInstance, customer) {
      $scope.customers = customers;
      $scope.customer = customer;
      $scope.isDetail = true;

      $scope.close = function() {
        $modalInstance.dismiss('cancel');
      };

      $scope.goToPage = function(page, offset, limit) {
        customers.fetchOrders(offset, limit, customer.distributorId);
      };
    }
  ]
);