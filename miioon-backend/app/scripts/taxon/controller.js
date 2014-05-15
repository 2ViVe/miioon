'use strict';

angular.module('2ViVe')
  .controller('TaxonController', ['$scope', 'Products', '$routeParams', 'Taxons',
    function($scope, Products, $routeParams, Taxons) {
      var UKCountryId = 1213;
      $scope.currentTaxonId = Number($routeParams.taxonId);

      Taxons.fetch().then(function() {
        $scope.taxons = Taxons.getByPositionBetween(0, 1000);
        Products.getByTaxon($scope.currentTaxonId, UKCountryId)
          .then(function(data) {
            $scope.products = data.products;
          });
      });
    }])
  .controller('MarketingMaterialsController', ['$scope', 'Products', 'User',
    function($scope, Products, User) {
      var UKCountryId = 1213;
      var MarketingMaterialsTaxonId = 21;
      var MarketingMaterialsCatalogCode = 'MM';

      User.fetch().then(function() {
        Products.getByTaxon(MarketingMaterialsTaxonId, UKCountryId, MarketingMaterialsCatalogCode)
          .then(function(data) {
            $scope.products = data.products;
          });
      });
    }]);
