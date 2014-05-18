'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Products', '$routeParams', 'Taxons', 'DEFAULT_COUNTRY_ID',
    function($scope, Products, $routeParams, Taxons, DEFAULT_COUNTRY_ID) {
      var taxonPermalink = $routeParams.taxonPermalink;
      var subTaxonPermalink = $routeParams.subTaxonPermalink;

      Taxons.fetch().then(function() {
        $scope.taxon = Taxons.getByPermalink(taxonPermalink);
        var productTaxonId = $scope.taxon.id;

        if (subTaxonPermalink) {
          $scope.currentSubTaxon = Taxons.getSubTaxonByPermalinkAndTaxon(subTaxonPermalink, $scope.taxon);
          productTaxonId = $scope.currentSubTaxon.id;
        }

        Products.getByTaxon(productTaxonId, DEFAULT_COUNTRY_ID)
          .then(function(data) {
            $scope.products = data.products;
          });
      });
    }]);
