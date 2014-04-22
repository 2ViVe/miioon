'use strict';

angular.module('2ViVe')
  .factory('Products', ['$http',
    function($http) {
      return {
        getByTaxon: function(taxonId) {
          //TODO: need to remove role code and country id when API is modified
          return $http.get('/api/v2/products/taxons/' + taxonId + '?role-code=R&country-id=1213');
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
              return null;
            }
          });
          Variants.data.splice(itemIndex, 1);
        },
        getByIds: function(ids) {
          if (ids.length === 0) {
            return null;
          }
          return $http.get('/api/v2/variants?id=' + ids.join(','))
            .success(function(data) {
              Variants.data = data.response;
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
        //TODO: need to remove role code when API is modified
        product.fetch = $http.get('/api/v2/products/' + id + '?role-code=R')
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
            return null;
          }
        });
        return result;
      };
      return Product;
    }]);