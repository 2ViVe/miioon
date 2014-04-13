'use strict';

angular.module('2ViVe')
  .controller('ProductController', ['$scope', 'Product', '$routeParams', 'Taxons',
    function($scope, Product, $routeParams, Taxons) {
      var product = new Product($routeParams.productId);
      product.fetch.success(function() {
        $scope.product = product.data;
        $scope.colors = product.colors;
        $scope.sizes = product.sizes;

        $scope.$watch(function() {
          return Taxons.data;
        }, function() {
          $scope.subTaxon = Taxons.getSubTaxonById(product.data['taxon-id']);
          if ($scope.subTaxon !== null) {
            $scope.taxon = Taxons.getById($scope.subTaxon.parent_id);
          } else {
            $scope.taxon = Taxons.getById(product.data['taxon-id']);
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
