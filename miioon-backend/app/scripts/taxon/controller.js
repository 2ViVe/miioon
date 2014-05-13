'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Products', '$routeParams', 'Taxons',
    function($scope, Products, $routeParams, Taxons) {
      var UKCountryId = 1213;
      $scope.currentTaxonId = 9;

      $scope.changeSubTaxon = function(subTaxonId) {
        $scope.currentTaxonId = subTaxonId;

        Products.getByTaxon($scope.currentTaxonId, UKCountryId)
          .then(function(data) {
            $scope.products = data.products;
          });
      };

      Taxons.fetch().then(function() {
        $scope.taxons = Taxons.getByPositionMoreThan(0);
        $scope.changeSubTaxon($scope.currentTaxonId);
      });
    }]);
