'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Products', '$routeParams', 'taxons',
    function($scope, Products, $routeParams, taxons) {
      var taxonPermalink = $routeParams.taxonPermalink;
      var subTaxonPermalink = $routeParams.subTaxonPermalink;

      $scope.taxons = taxons.getByPositionBetween(0, 1000);
      var taxon = taxons.getByPermalink(taxonPermalink);
      $scope.currentTaxonId = taxon.id;

      if (subTaxonPermalink) {
        var subTaxon = taxons.getSubTaxonByPermalinkAndTaxon(subTaxonPermalink, taxon);
        $scope.currentTaxonId = subTaxon.id;
      }

      Products.getByTaxon($scope.currentTaxonId)
        .then(function(data) {
          $scope.products = data.products;
        });
    }])
  .controller('MarketingMaterialsController', ['$scope', 'products',
    function($scope, products) {
      $scope.products = products.products;
    }]);
