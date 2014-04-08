'use strict';

angular.module('2ViVe')
  .factory('Taxons', ['$http',
    function($http) {
      var Taxons =  {
        fetch: function() {
          return $http.get('/api/v2/taxons', {
            headers: {
              'X-Authentication-Token': 'MTAwODEwMTo6NDQ5ODM6OnRlc3QxMjM6Ojo6MTM5Njc4OTg0NDYyNjo6WmxuRWxMTkZqRnQ2cE9CQU9RcEg4ZTo6RUNFamdIMThsODNaNTVCOFBFL2lteE5uUXNqZFVueVQ2VzA0MHdsN1FLbz0='
            }
          }).success(function(data) {
            Taxons.data = data.response;
          });
        },
        data: [],
        getAll: function() {
          return Taxons.data;
        },
        getByPositionMoreThan: function(position) {
          var results = [];
          angular.forEach(Taxons.data, function(taxon) {
            if (taxon.position > position) {
              results.push(taxon);
              return;
            }
          });
          return results;
        },
        getById: function(id) {
          var result = null;
          angular.forEach(Taxons.data, function(taxon) {
            if (taxon.id === id) {
              result = taxon;
              return;
            }
          });
          return result;
        }
      };
      Taxons.fetch();
      return Taxons;
    }]);