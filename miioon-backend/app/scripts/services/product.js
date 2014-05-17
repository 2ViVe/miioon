'use strict';

angular.module('2ViVe')
  .factory('Products', ['$http', 'User', 'CamelCaseLize', '$q',
    function($http, User, CamelCaseLize, $q) {
      return {
        getByTaxon: function(taxonId, countryId, catalogCode) {
          var deferred = $q.defer();
          $http.get('/api/v2/products/taxons/' + taxonId, {
            transformResponse: CamelCaseLize,
            cache: true,
            params: {
              'role-code': User.isLogin ? null : 'R',
              'country-id': countryId,
              'catalog-code': catalogCode
            }
          }).then(function(response) {
            deferred.resolve(response.data.response);
          });

          return deferred.promise;
        }
      };
    }])
  .factory('Variants', ['$http', 'User', 'CamelCaseLize',
    function($http, User, CamelCaseLize) {
      var Variants = {
        data: [],
        getById: function(id) {
          var _variant = null;
          angular.forEach(Variants.data, function(variant) {
            if (variant.id === id) {
              _variant = variant;
            }
          });
          return _variant;
        },
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
            transformResponse: CamelCaseLize,
            params: {
              'role-code': User.isLogin ? null : 'R',
              'id': ids.join(',')
            }
          }).success(function(data) {
            Variants.data = data.response;
          });
        }
      };
      return Variants;
    }])
  .factory('Product', ['$http', 'User', 'CamelCaseLize', '$q',
    function($http, User, CamelCaseLize, $q) {
      var ATTRIBUTE_KEY = {
        'Color': 'colors',
        'Size': 'sizes'
      };

      var Product = function(id, catalogCode) {
        var product = this;
        product.colors = [];
        product.sizes = [];
        product.id = id;
        product.catalogCode = catalogCode ? catalogCode : null;
      };

      Product.prototype.fetch = function() {
        var deferred = $q.defer();
        var product = this;

        User.fetch().finally(function() {
          $http.get('/api/v2/products/' + product.id, {
            transformResponse: CamelCaseLize,
            params: {
              'role-code': User.isLogin ? null : 'R',
              'catalog-code': product.catalogCode
            }
          }).then(function(response) {
            product.data = response.data.response;
            angular.forEach(product.data.variants, function(variant) {
              angular.forEach(variant.options, function(option) {
                if (product[ATTRIBUTE_KEY[option.type]].indexOf(option.name) < 0) {
                  product[ATTRIBUTE_KEY[option.type]].push(option.name);
                }
              });
            });
            deferred.resolve(product);
          });
        });

        return deferred.promise;
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