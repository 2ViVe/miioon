'use strict';

angular.module('2ViVe')
  .factory('Product', ['$http',
    function($http) {
      return {
        getByTaxon: function(taxonId) {
          return $http.get('/api/v2/products/taxons/' + taxonId, {
            headers: {
              'X-Authentication-Token': 'MTAwODEwMTo6NDQ5ODM6OnRlc3QxMjM6Ojo6MTM5Njc4OTg0NDYyNjo6WmxuRWxMTkZqRnQ2cE9CQU9RcEg4ZTo6RUNFamdIMThsODNaNTVCOFBFL2lteE5uUXNqZFVueVQ2VzA0MHdsN1FLbz0='
            }
          });
        }
      };
    }]);