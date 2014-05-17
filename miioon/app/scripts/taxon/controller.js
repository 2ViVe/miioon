'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Products', '$routeParams', 'Taxons',
    function($scope, Products, $routeParams, Taxons) {
      var UKCountryId = 1213;
      var taxonPermalink = $routeParams.taxonPermalink;
      var subTaxonPermalink = $routeParams.subTaxonPermalink;

      Taxons.fetch().then(function() {
        $scope.taxon = Taxons.getByPermalink(taxonPermalink);
        var productTaxonId = $scope.taxon.id;

        if (subTaxonPermalink) {
          $scope.currentSubTaxon = Taxons.getSubTaxonByPermalinkAndTaxon(subTaxonPermalink, $scope.taxon);
          productTaxonId = $scope.currentSubTaxon.id;
        }

        Products.getByTaxon(productTaxonId, UKCountryId)
          .then(function(data) {
            $scope.products = data.products;
          });
      });
    }]);
