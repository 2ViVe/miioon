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

      Taxons.fetch().then(function() {
        product = new Product($routeParams.productId);
        product.fetch().then(function() {
          $scope.product = product.data;
          $scope.colors = product.colors;
          $scope.sizes = product.sizes;
          $scope.selectedColor = product.colors[0];
          $scope.selectedSize = product.sizes[0];
          $scope.currentImage = product.data.images[0];
          updateVariant(product);

          $scope.subTaxon = Taxons.getSubTaxonById(product.data.taxonId);
          if ($scope.subTaxon !== null) {
            $scope.taxon = Taxons.getById($scope.subTaxon.parentId);
          } else {
            $scope.taxon = Taxons.getById(product.data.taxonId);
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