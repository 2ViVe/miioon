'use strict';

angular.module('2ViVe')
  .controller('MainNavigationController', ['$scope', 'Taxons',
    function($scope, Taxons) {
      Taxons.fetch().success(function() {
        $scope.taxons = Taxons.getByPositionMoreThan(0);
      });
    }]);
