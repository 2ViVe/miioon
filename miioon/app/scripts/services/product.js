'use strict';

angular.module('2ViVe')
  .factory('Product', ['$http', 'User',
    function($http, User) {
      return {
        getByTaxon: function(taxonId) {
          return $http.get('/api/v2/products/taxons/' + taxonId, {
            headers: {
              'X-Authentication-Token': User.getToken()
            }
          });
        },
        getById: function(id) {
          return $http.get('/api/v2/products/' + id, {
            headers: {
              'X-Authentication-Token': User.getToken()
            }
          });
        }
      };
    }]);