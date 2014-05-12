'use strict';

angular.module('2ViVe')
  .filter('taxonLink', function() {
    return function(taxon) {
      if (taxon === null || taxon === undefined) {
        return;
      }
      var link = '/#/taxon/' + taxon.id;
      var subTaxons = taxon.subTaxons;
      if (subTaxons.length > 0) {
        link += '/sub-taxon/' + subTaxons[0].id;
      }
      return link;
    };
  });