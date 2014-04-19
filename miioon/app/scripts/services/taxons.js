'use strict';

angular.module('2ViVe')
  .factory('Taxons', ['$http',
    function($http) {
      var Taxons = {
        fetch: function() {
          return $http.get('/api/v2/taxons')
            .success(function(data) {
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
        getSubTaxonById: function(subTaxonId) {
          var result = null;
          angular.forEach(Taxons.data, function(taxon) {
            var subTaxon = Taxons.getSubTaxonByIdAndTaxon(subTaxonId, taxon);
            if (subTaxon !== null) {
              result = subTaxon;
              return;
            }
          });
          return result;
        },
        getSubTaxonByIdAndTaxon: function(subTaxonId, taxon) {
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
      return Taxons;
    }]);