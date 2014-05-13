'use strict';

angular.module('2ViVe')
  .controller('MainNavigationController', ['$scope', 'Taxons',
    function($scope, Taxons) {
      Taxons.fetch().then(function() {
        $scope.taxons = Taxons.getByPositionBetween(0, 1000);
      });
    }]);
