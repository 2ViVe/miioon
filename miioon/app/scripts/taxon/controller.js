'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Product', '$routeParams', 'Taxons',
    function($scope, Product, $routeParams, Taxons) {
      var taxonId = Number($routeParams.taxonId);
      $scope.taxon = Taxons.getById(taxonId);
      var subTaxonId = Number($routeParams.subTaxonId);
      $scope.subTaxonId = subTaxonId;
      Product.getByTaxon(subTaxonId).success(function(data) {
        $scope.products = data.response.products;
      });
    }]);
