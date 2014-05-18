'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Products', '$routeParams', 'Taxons',
    function($scope, Products, $routeParams, taxons) {
      var taxonPermalink = $routeParams.taxonPermalink;
      var subTaxonPermalink = $routeParams.subTaxonPermalink;

      $scope.taxon = taxons.getByPermalink(taxonPermalink);
      var productTaxonId = $scope.taxon.id;

      if (subTaxonPermalink) {
        $scope.currentSubTaxon = taxons.getSubTaxonByPermalinkAndTaxon(subTaxonPermalink, $scope.taxon);
        productTaxonId = $scope.currentSubTaxon.id;
      }

      Products.getByTaxon(productTaxonId)
        .then(function(data) {
          $scope.products = data.products;
        });
    }]);
