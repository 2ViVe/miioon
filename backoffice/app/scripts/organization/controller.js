'use strict';

angular.module('2ViVe')
  .controller('OrganizationController', ['$scope', 'organization', function($scope, organization) {

    var _numberPerPage = 25;

    var updateOrder = function(offset, numberPerPage) {
      if (numberPerPage) {
        _numberPerPage = numberPerPage;
      }

      return organization.fetch($scope.date, $scope.isShowOrderList, $scope.distributorId, offset, _numberPerPage)
        .then(function(result) {
          $scope.orders = result.rows;
          if ($scope.distributorId) {
            $scope.count = 1;
          } else {
            $scope.count = result.meta.count;
          }
        });
    };

    $scope.updateOrderAndRefreshPagination = function() {
      updateOrder(0)
        .then(function() {
          $scope.refreshPagination($scope.count);
        });
    };

    organization.getDate().then(function(date) {
      $scope.isShowOrderList = false;
      $scope.distributorId = null;
      $scope.orders = [];
      $scope.dateArr = date;
      $scope.years = Object.keys(date);
      $scope.months = date[$scope.selectYear];
      $scope.selectYear = $scope.years[$scope.years.length - 1];
      $scope.selectMonth = date[$scope.selectYear][0];
      $scope.date = $scope.selectYear + $scope.selectMonth;
      $scope.months = date[$scope.selectYear];
      $scope.updateOrderAndRefreshPagination();
      $scope.selectMonth = $scope.selectMonth.substr(0, 2);
    })
      .catch(function() {
        $scope.selectYear = null;
        $scope.selectMonth = null;
      });

    $scope.goToPage = function(page, offset, numberPerPage) {
      updateOrder(offset, numberPerPage);
    };

    $scope.getMonth = function() {
      $scope.months = $scope.dateArr[$scope.selectYear];
    };

    $scope.updateDate = function() {
      $scope.date = $scope.selectYear + $scope.selectMonth + '01';
      $scope.updateOrderAndRefreshPagination();
    };

    $scope.parseFloat = function(value) {
      return parseFloat(value);
    };

    $scope.clearDistributorId = function() {
      $scope.distributorId = null;
      $scope.updateOrderAndRefreshPagination();
    };
  }]);