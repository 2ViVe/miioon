'use strict';

angular.module('2ViVe')
  .controller('CommissionRankController', ['$scope', 'Commission', '$modal', function($scope, Commission, $modal) {

    var commission = new Commission();

    commission.getDate().then(function(date){
      $scope.dateArr = date;
      $scope.years = Object.keys(date);
      $scope.months = date[$scope.selectYear];
      $scope.selectYear = $scope.years[$scope.years.length - 1];
      $scope.selectMonth = date[$scope.selectYear][0];
      $scope.date = $scope.selectYear + $scope.selectMonth;
      $scope.months = date[$scope.selectYear];
      updateRank();
      $scope.selectMonth = $scope.selectMonth.substr(0,2);
    })
      .catch(function(){
        $scope.selectYear = null;
        $scope.selectMonth = null;
      });

    var updateRank = $scope.updateRank = function(){
      return commission.fetchRank($scope.date)
        .then(function(result){
          $scope.rank = result;
        });
    };

    $scope.updateDate = function(){
      $scope.date = $scope.selectYear + $scope.selectMonth + '01' ;
      updateRank();
    };

    $scope.showNextRankModel = function(){
      $modal.open({
        templateUrl: 'views/commission/nextRankModel.html',
        controller: 'nextRankModelController',
        resolve: {
          nextRankDetails: function () {
            return $scope.rank.nextRankDetails;
          }
        }
      });
    };

    $scope.showDetailModel = function(){
      $modal.open({
        templateUrl: 'views/commission/detailModel.html',
        controller: 'detailModelController',
        resolve: {
          details: function () {
            return $scope.rank.details;
          }
        }
      });
    };

  }])
  .controller('nextRankModelController', ['$scope', 'nextRankDetails', function($scope, nextRankDetails){
    $scope.input = {};
    $scope.input.nextRankDetails = nextRankDetails.requirements;
  }])
  .controller('detailModelController', ['$scope', 'details', '$modal', function($scope, details, $modal){
    $scope.input = {};
    $scope.input.details = details;
    $scope.input.viewDetail = function(id) {
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