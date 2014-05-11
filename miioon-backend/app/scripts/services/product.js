'use strict';

angular.module('2ViVe')
  .factory('Products', ['$http', 'User',
    function($http, User) {
      return {
        getByTaxon: function(taxonId) {
          return $http.get('/api/v2/products/taxons/' + taxonId, {
            params: {
              'role-code': User.isLogin ? null : 'R',
              'country-id': '1213'
            }
          });
        }
      };
    }])
  .factory('Variants', ['$http', 'User',
    function($http, User) {
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
          return $http.get('/api/v2/variants', {
            params: {
              'role-code': User.isLogin ? null : 'R',
              'id': ids.join(',')
            }
          }).success(function(data) {
            Variants.data = data.response;
          });
        },
        getById: function(id) {
          return $http.get('/api/v2/variants/' + id);
        }
      };
      return Variants;
    }])
  .factory('Product', ['$http', 'User',
    function($http, User) {
      var ATTRIBUTE_KEY = {
        'Color': 'colors',
        'Size': 'sizes'
      };

      var Product = function(id) {
        var product = this;
        product.colors = [];
        product.sizes = [];
        product.fetch = $http.get('/api/v2/products/' + id, {
          params: {
            'role-code': User.isLogin ? null : 'R'
          }
        }).success(function(data) {
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