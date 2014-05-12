'use strict';

angular.module('2ViVe')
  .factory('Taxons', ['$http', 'CamelCaseLize', '$q',
    function($http, CamelCaseLize, $q) {
      var _data = [];

      function hardCodeTaxonImages(taxons) {
        angular.forEach(taxons, function(taxon) {
          taxon.image = 'images/taxon/banner-' + taxon.id + '.png';
          angular.forEach(taxon.subTaxons, function(subTaxon) {
            subTaxon.image = 'images/taxon/banner-' + taxon.id + '-' + subTaxon.id + '.png';
          });
        });
      }

      var Taxons = {
        fetch: function() {
          var deferred = $q.defer();
          $http.get('/api/v2/taxons', {
            transformResponse: CamelCaseLize,
            cache: true
          }).then(function(response) {
            _data = response.data.response;
            hardCodeTaxonImages(_data);
            deferred.resolve(_data);
          });

          return deferred.promise;
        },
        getByPositionMoreThan: function(position) {
          var results = [];
          angular.forEach(_data, function(taxon) {
            if (taxon.position > position) {
              results.push(taxon);
              return null;
            }
          });
          return results;
        },
        getSubTaxonById: function(subTaxonId) {
          var result = null;
          angular.forEach(_data, function(taxon) {
            var subTaxon = Taxons.getSubTaxonByIdAndTaxon(subTaxonId, taxon);
            if (subTaxon !== null) {
              result = subTaxon;
              return null;
            }
          });
          return result;
        },
        getSubTaxonByIdAndTaxon: function(subTaxonId, taxon) {
          var result = null;
          if (taxon === null) {
            return result;
          }
          angular.forEach(taxon.subTaxons, function(subTaxon) {
            if (subTaxon.id === subTaxonId) {
              result = subTaxon;
              return null;
            }
          });
          return result;
        },
        getById: function(id) {
          var result = null;
          angular.forEach(_data, function(taxon) {
            if (taxon.id === id) {
              result = taxon;
              return null;
            }
          });
          return result;
        }
      };
      return Taxons;
    }]);