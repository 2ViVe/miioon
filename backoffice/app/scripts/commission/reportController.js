'use strict';

angular.module('2ViVe')
  .controller('CommissionReportController', ['$scope', 'commission', function($scope, commission) {
    var _numberPerPage = 25;
    $scope.commissionTypes = commission.type;

    commission.getDate().then(function(date){
      $scope.selectType = $scope.commissionTypes[0];
      $scope.distributorId = null;
      $scope.dateArr = date;
      $scope.years = Object.keys(date);
      $scope.months = date[$scope.selectYear];
      $scope.selectYear = $scope.years[$scope.years.length - 1];
      $scope.selectMonth = date[$scope.selectYear][0];
      $scope.date = $scope.selectYear + $scope.selectMonth;
      $scope.months = date[$scope.selectYear];
      $scope.updateReportAndRefreshPagination();
      $scope.selectMonth = $scope.selectMonth.substr(0,2);
    })
      .catch(function(){
        $scope.selectYear = null;
        $scope.selectMonth = null;
      });

    var updateReport = function(offset, numberPerPage){
      if (numberPerPage) {
        _numberPerPage = numberPerPage;
      }
      return commission.fetch($scope.date, $scope.selectType.code, offset, _numberPerPage)
        .then(function(result){
          var deletedArr = deleteOrder(result.data.names, result.data.values);
          $scope.names = result.data.names;
          $scope.values = result.data.values;
          $scope.count = result.meta.count;
          $scope.overview = result.overview;
        });
    };

    function deleteOrder(names, values){
      var index = names.indexOf('Orders');
      names.splice(index, 1);
      var newValues = [];
      values.forEach(function(value){
        value.splice(index, 1);
        newValues.push(value);
      });
      return {
        names: names,
        values: newValues
      }
    }

    $scope.updateReportAndRefreshPagination = function() {
      updateReport(0)
        .then(function() {
          $scope.refreshPagination($scope.count);
        });
    };

    $scope.goToPage = function(page, offset, limit){
      updateReport(offset, limit);
    };

    $scope.updateDate = function(){
      $scope.date = $scope.selectYear + $scope.selectMonth + '01' ;
      $scope.updateReportAndRefreshPagination();
    };



  }]);