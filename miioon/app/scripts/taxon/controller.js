'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Product', '$routeParams', 'Taxons',
    function($scope, Product, $routeParams, Taxons) {
      var taxonId = Number($routeParams.taxonId);
      var subTaxonId = Number($routeParams.subTaxonId);
      $scope.taxon = Taxons.getById(taxonId);
      $scope.$watch(function() {
        return Taxons.data;
      }, function() {
        $scope.taxon = Taxons.getById(taxonId);
      });

      $scope.subTaxonId = subTaxonId;
      Product.getByTaxon(subTaxonId).success(function(data) {
        $scope.products = data.response.products;
      });
    }]);
