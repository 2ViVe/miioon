'use strict';

angular.module('2ViVe')
  .controller('ProductController', ['$scope', 'Product', '$routeParams', 'Taxons', 'Shopping',
    function($scope, Product, $routeParams, Taxons, Shopping) {
      var updateVariant = function() {
        $scope.variant = product.getVariantByOptions({
          'Color': $scope.selectedColor,
          'Size': $scope.selectedSize
        });
      };

      var product = new Product($routeParams.productId);
      product.fetch.success(function() {
        $scope.product = product.data;
        $scope.colors = product.colors;
        $scope.sizes = product.sizes;
        $scope.selectedColor = product.colors[0];
        $scope.selectedSize = product.sizes[0];
        updateVariant();

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

      $scope.changeSize = function(size) {
        $scope.selectedSize = size;
        updateVariant();
      };

      $scope.changeColor = function(color) {
        $scope.selectedColor = color;
        updateVariant();
      };

      $scope.addToCart = function() {
        Shopping.add($scope.variant, $scope.quantity);
      };

      $scope.purchase = function() {
        Shopping.add($scope.variant, $scope.quantity)
          .success(function() {
            Shopping.checkout();
          });
      };

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
