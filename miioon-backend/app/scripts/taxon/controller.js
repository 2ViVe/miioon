'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Products', '$routeParams', 'Taxons', 'DEFAULT_COUNTRY_ID',
    function($scope, Products, $routeParams, Taxons, DEFAULT_COUNTRY_ID) {
      var taxonPermalink = $routeParams.taxonPermalink;
      var subTaxonPermalink = $routeParams.subTaxonPermalink;

      Taxons.fetch().then(function() {
        $scope.taxons = Taxons.getByPositionBetween(0, 1000);
        var taxon = Taxons.getByPermalink(taxonPermalink);
        $scope.currentTaxonId = taxon.id;

        if (subTaxonPermalink) {
          var subTaxon = Taxons.getSubTaxonByPermalinkAndTaxon(subTaxonPermalink, taxon);
          $scope.currentTaxonId = subTaxon.id;
        }

        Products.getByTaxon($scope.currentTaxonId, DEFAULT_COUNTRY_ID)
          .then(function(data) {
            $scope.products = data.products;
          });
      });
    }])
  .controller('MarketingMaterialsController', ['$scope', 'Products', 'User', 'DEFAULT_COUNTRY_ID',
    function($scope, Products, User, DEFAULT_COUNTRY_ID) {
      var MarketingMaterialsTaxonId = 21;
      var MarketingMaterialsCatalogCode = 'MM';

      User.fetch().then(function() {
        Products.getByTaxon(MarketingMaterialsTaxonId, DEFAULT_COUNTRY_ID, MarketingMaterialsCatalogCode)
          .then(function(data) {
            $scope.products = data.products;
          });
      });
    }]);
