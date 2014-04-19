'use strict';

angular.module('2ViVe')
  .factory('Products', ['$http',
    function($http) {
      return {
        getByTaxon: function(taxonId) {
          return $http.get('/api/v2/products/taxons/' + taxonId);
        }
      };
    }])
  .factory('Variants', ['$http',
    function($http) {
      var Variants = {
        data: [],
        remove: function(variantId) {
          var itemIndex;
          angular.forEach(Variants.data, function(variant, index) {
            if (variant.id === variantId) {
              itemIndex = index;
              return;
            }
          });
          Variants.data.splice(itemIndex, 1);
        },
        getByIds: function(ids) {
          Variants.data = [];
          angular.forEach(ids, function(id) {
            Variants.getById(id).success(function(data) {
              data.response.id = id; //TODO: need to be removed when the API is fixed
              Variants.data.push(data.response);
            });
          });
        },
        getById: function(id) {
          return $http.get('/api/v2/variants/' + id);
        }
      };
      return Variants;
  }])
  .factory('Product', ['$http',
    function($http) {
      var ATTRIBUTE_KEY = {
        'Color': 'colors',
        'Size': 'sizes'
      };

      var Product = function(id) {
        var product = this;
        product.colors = [];
        product.sizes = [];
        product.fetch = $http.get('/api/v2/products/' + id)
          .success(function(data) {
            product.data = data.response;
            angular.forEach(product.data.variants, function(variant) {
              angular.forEach(variant.options, function(option) {
                if (product[ATTRIBUTE_KEY[option.type]].indexOf(option.name) < 0) {
                  product[ATTRIBUTE_KEY[option.type]].push(option.name);
                }
              });
            });
          });
      };
      Product.prototype.getVariantByOptions = function(options) {
        var result = null;
        var product = this;
        angular.forEach(product.data.variants, function(variant) {
          var isThisVariant = true;
          angular.forEach(variant.options, function(option) {
            if (options[option.type] !== option.name) {
              isThisVariant = false;
            }
          });
          if (isThisVariant) {
            result = variant;
            return;
          }
        });
        return result;
      };
      return Product;
    }]);