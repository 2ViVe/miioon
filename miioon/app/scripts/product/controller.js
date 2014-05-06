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

      var product;

      $scope.$watch(function() {
        return Taxons.data;
      }, function() {
        if (Taxons.data.length === 0) {
          return;
        }

        product = new Product($routeParams.productId);
        product.fetch.success(function() {
          $scope.product = product.data;
          $scope.colors = product.colors;
          $scope.sizes = product.sizes;
          $scope.selectedColor = product.colors[0];
          $scope.selectedSize = product.sizes[0];
          $scope.currentImage = product.data.images[0];
          updateVariant(product);

          $scope.subTaxon = Taxons.getSubTaxonById(product.data['taxon-id']);
          if ($scope.subTaxon !== null) {
            $scope.taxon = Taxons.getById($scope.subTaxon.parent_id);
          } else {
            $scope.taxon = Taxons.getById(product.data['taxon-id']);
          }
        });
      });

      $scope.changeImage = function(image) {
        $scope.currentImage = image;
      };

      $scope.thumbnailImage = function(image) {
        return image.replace('large', 'small');
      };

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
    }]);
