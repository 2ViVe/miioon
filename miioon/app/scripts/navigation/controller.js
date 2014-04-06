'use strict';

angular.module('2ViVe')
  .controller('MainNavigationController', ['$scope', 'Product',
    function($scope, Product) {
      Product.taxons().success(function(data) {
        $scope.taxons = data.response;
      });
    }]);
