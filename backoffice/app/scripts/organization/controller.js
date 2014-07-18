'use strict';

angular.module('2ViVe')
  .controller('OrganizationController', ['$scope', 'organization', function($scope, organization) {
    organization.getDate().then(function(date){
      $scope.curpage = 1;
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
      updateOrder(true);
      $scope.selectMonth = $scope.selectMonth.substr(0,2);
    })
      .catch(function(){
        $scope.selectYear = null;
        $scope.selectMonth = null;
      });

    var updateOrder = $scope.updateOrder = function(reflash){
      if (reflash) {
        $scope.offset = 0;
        $scope.curpage = 1;
      }
      return organization.fetch($scope.date, $scope.isShowOrderList, $scope.distributorId, $scope.offset)
        .then(function(result){
          $scope.orders = result.rows;
            if($scope.distributorId){
              $scope.count = 1;
            } else {
              $scope.count = result.meta.count;
            }
        })
        .then(function(){
          if (reflash){
            $scope.refreshPagination($scope.count);
          }
        });
    };

    $scope.goToPage = function(page){
      $scope.curpage = page;
      $scope.offset = ($scope.curpage - 1) * 25 + 1;
      updateOrder();
    };

    $scope.getMonth = function(){
      $scope.months = $scope.dateArr[$scope.selectYear];
    };

    $scope.updateDate = function(){
      $scope.date = $scope.selectYear + $scope.selectMonth + '01' ;
      updateOrder(true);
    };

    $scope.parseFloat = function(value){
      return parseFloat(value);
    };

    $scope.clearDistributorId = function(){
      $scope.distributorId = null;
      updateOrder(true);
    };
  }]);