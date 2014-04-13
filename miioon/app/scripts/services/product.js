'use strict';

angular.module('2ViVe')
  .factory('Products', ['$http', 'User',
    function($http, User) {
      return {
        getByTaxon: function(taxonId) {
          return $http.get('/api/v2/products/taxons/' + taxonId, {
            headers: {
              'X-Authentication-Token': User.getToken()
            }
          });
        }
      }
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
          headers: {
            'X-Authentication-Token': User.getToken()
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
      return Product;
    }]);