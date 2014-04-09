'use strict';

angular.module('2ViVe')
  .factory('Taxons', ['$http',
    function($http) {
      var Taxons = {
        fetch: function() {
          return $http.get('/api/v2/taxons', {
            headers: {
              'X-Authentication-Token': 'MTAwODEwMTo6NDQ5ODM6OnRlc3QxMjM6Ojo6MTM5Njc4OTg0NDYyNjo6WmxuRWxMTkZqRnQ2cE9CQU9RcEg4ZTo6RUNFamdIMThsODNaNTVCOFBFL2lteE5uUXNqZFVueVQ2VzA0MHdsN1FLbz0='
            }
          }).success(function(data) {
            var taxons = data.response;
            angular.forEach(taxons, function(taxon) {
              taxon.image = 'images/taxon/banner-' + taxon.id + '.png';
              angular.forEach(taxon['sub-taxons'], function(subTaxon) {
                subTaxon.image = 'images/taxon/banner-' + taxon.id + '-' + subTaxon.id + '.png';
              });
            });
            Taxons.data = data.response;
          });
        },
        data: [],

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
        getSubTaxonById: function(taxon, subTaxonId) {
          var result = null;
          if (taxon === null) {
            return result;
          }
          angular.forEach(taxon['sub-taxons'], function(subTaxon) {
            if (subTaxon.id === subTaxonId) {
              result = subTaxon;
              return;
            }
          });
          return result;
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