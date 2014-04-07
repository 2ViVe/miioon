'use strict';

angular.module('2ViVe')
  .controller('MainNavigationController', ['$scope', 'Taxons',
    function($scope, Taxons) {
      var taxons = new Taxons();
      taxons.get().success(function(data) {
        $scope.taxons = data.response;
      });

      $scope.frontendTaxons = function(taxon) {
        return taxon.position > 0;
      };
    }]);
