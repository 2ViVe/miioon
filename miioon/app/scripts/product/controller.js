'use strict';

angular.module('2ViVe')
  .controller('ProductController', ['$scope', 'Product', '$routeParams', 'Taxons',
    function($scope, Product, $routeParams, Taxons) {
      var productId = $routeParams.productId;
      Product.getById(productId).success(function(data) {
        var product = data.response;
        $scope.product = product;

        $scope.$watch(function() {
          return Taxons.data;
        }, function() {
          $scope.subTaxon = Taxons.getSubTaxonById(product['taxon-id']);
          if ($scope.subTaxon !== null) {
            $scope.taxon = Taxons.getById($scope.subTaxon.parent_id);
          } else {
            $scope.taxon = Taxons.getById(product['taxon-id']);
          }
        });
      });
      $scope.tabs = [
        {
          'title': 'Product Description',
          'content': 'Product Description Product Description Product Description'
        },
        {
          'title': 'Size Charts',
          'content': 'Size Charts Size Charts Size Charts Size Charts'
        },
        {
          'title': 'Video',
          'content': 'Video Video Video Video'
        }
      ];
    }]);
