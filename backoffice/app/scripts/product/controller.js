'use strict';

angular.module('2ViVe')
  .controller('ProductController', ['$scope', 'product', 'taxons', 'Shopping', 'LocalStorage', '$modal',
    function($scope, product, taxons, Shopping, LocalStorage, $modal) {
      var updateVariant = function() {
        $scope.variant = product.getVariantByOptions({
          'Color': $scope.selectedColor,
          'Size': $scope.selectedSize
        });
      };

      $scope.product = product.data;
      $scope.colors = product.colors;
      $scope.sizes = product.sizes;
      $scope.selectedColor = product.colors[0];
      $scope.selectedSize = product.sizes[0];
      $scope.currentImage = product.data.images[0];
      $scope.catalogCode = product.catalogCode;

      updateVariant();

      $scope.subTaxon = taxons.getSubTaxonById(product.data.taxonId);
      if ($scope.subTaxon !== null) {
        $scope.taxon = taxons.getById($scope.subTaxon.parentId);
      } else {
        $scope.taxon = taxons.getById(product.data.taxonId);
      }

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
        Shopping.add($scope.variant, $scope.quantity, product.catalogCode)
          .success(function() {
            $modal.open({
              templateUrl: 'views/shopping/shopping-modal.html',
              controller: 'ShoppingModalController',
              resolve: {
                shopping: ['Shopping', function(Shopping) {
                  return Shopping.fetch();
                }]
              }
            });
          });
      };

      $scope.purchase = function() {
        Shopping.add($scope.variant, $scope.quantity, product.catalogCode)
          .success(function() {
            Shopping.checkout();
          });
      };
    }]);
