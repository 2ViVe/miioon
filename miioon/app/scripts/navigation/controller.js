'use strict';

angular.module('2ViVe')
  .controller('MainNavigationController', ['$scope', 'Taxons',
    function($scope, Taxons) {
      $scope.taxons = Taxons.getByPositionMoreThan(0);
      $scope.$watch(function() {
        return Taxons.data;
      }, function() {
        $scope.taxons = Taxons.getByPositionMoreThan(0);
      });
    }]);
