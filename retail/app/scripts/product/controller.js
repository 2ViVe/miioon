'use strict';

angular.module('2ViVe')
  .controller('ProductController', ['$scope', 'product', 'taxons', 'Shopping', 'LocalStorage', '$modal',
    function($scope, product, taxons, Shopping, LocalStorage, $modal) {
      var replicateOwner = LocalStorage.getReplicateOwner();
      $scope.replicateOwnerLogin = replicateOwner ? replicateOwner.login : '';

      $scope.personalizedTypes = product.data.personalizedTypes;
      $scope.personalizedValues = [];

      $scope.initPersonalizedValues = function(personalizedType, index) {
        $scope.personalizedValues[index] = {
          id: personalizedType.id,
          name: personalizedType.name
        };
      };

      $scope.product = product.data;

      $scope.allOptions = product.options;
      $scope.currentOptions = {};
      angular.forEach($scope.allOptions, function(options, optionType) {
        $scope.currentOptions[optionType] = options[0];
      });
      $scope.variant = product.getVariantByOptions($scope.currentOptions);
      console.log($scope.currentOptions);

      $scope.changeOption = function(option, optionType) {
        $scope.currentOptions[optionType] = option;
        $scope.variant = product.getVariantByOptions($scope.currentOptions);

        if ($scope.variant.images && $scope.variant.images.length > 0) {
          $scope.currentImage = $scope.variant.images[0];
          $scope.currentImages = $scope.variant.images;
        } else {
          $scope.currentImage = product.data.images[0];
          $scope.currentImages = product.data.images;
        }
      };

      $scope.getOptionStyle = function(option) {
        if (option.presentationType === 'TXT' && option.presentationValue[0] === '#') {
          return {
            'background-color': option.presentationValue
          };
        }
        return null;
      };

      $scope.catalogCode = product.catalogCode;

      $scope.subTaxon = taxons.getSubTaxonById(product.data.taxonId);
      if ($scope.subTaxon !== null) {
        $scope.taxon = taxons.getById($scope.subTaxon.parentId);
      } else {
        $scope.taxon = taxons.getById(product.data.taxonId);
      }

      $scope.currentImage = product.data.images[0];
      $scope.currentImages = product.data.images;

      $scope.changeImage = function(image) {
        $scope.currentImage = image;
      };

      $scope.thumbnailImage = function(image) {
        return image.replace('large', 'small');
      };

      $scope.addToCart = function() {
        console.log($scope.variant);
        console.log($scope.quantity);
        console.log(product.catalogCode);
        console.log($scope.personalizedValues);
        Shopping.add($scope.variant, $scope.quantity, product.catalogCode, $scope.personalizedValues)
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
    }]);
