'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Products', '$routeParams', 'Taxons',
    function($scope, Products, $routeParams, Taxons) {
      var taxonId = Number($routeParams.taxonId);
      var subTaxonId = Number($routeParams.subTaxonId);

      Taxons.fetch().success(function() {
        if (Taxons.data.length === 0) {
          return null;
        }
        $scope.taxon = Taxons.getById(taxonId);
        $scope.currentSubTaxon = Taxons.getSubTaxonByIdAndTaxon(subTaxonId, $scope.taxon);

        if ($scope.currentSubTaxon === null) {
          Products.getByTaxon(taxonId).success(function(data) {
            $scope.products = data.response.products;
          });
        } else {
          Products.getByTaxon(subTaxonId).success(function(data) {
            $scope.products = data.response.products;
          });
        }
      });
    }]);
