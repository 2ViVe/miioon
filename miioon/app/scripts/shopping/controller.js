'use strict';

angular.module('2ViVe')
  .controller('ShoppingController', ['$scope', 'Shopping',
    function($scope, Shopping) {
      $scope.shopping = Shopping;
    }
  ]);