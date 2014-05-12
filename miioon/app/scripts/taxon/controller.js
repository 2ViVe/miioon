'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Products', '$routeParams', 'Taxons',
    function($scope, Products, $routeParams, Taxons) {
      var UKCountryId = 1213;
      var taxonId = Number($routeParams.taxonId);
      var subTaxonId = Number($routeParams.subTaxonId);
      var productTaxonId = subTaxonId ? subTaxonId : taxonId;

      Taxons.fetch().success(function() {
        $scope.taxon = Taxons.getById(taxonId);
        $scope.currentSubTaxon = Taxons.getSubTaxonByIdAndTaxon(subTaxonId, $scope.taxon);

        Products.getByTaxon(productTaxonId, UKCountryId)
          .then(function(data) {
            $scope.products = data.products;
          });
      });
    }]);
