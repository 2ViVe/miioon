'use strict';

angular.module('2ViVe')
  .filter('taxonLink', function() {
    return function(taxon) {
      if (taxon === null || taxon === undefined) {
        return;
      }
      var link = '/#/taxon/' + taxon.id;
      if (taxon['sub-taxons'].length > 0) {
        link += '/sub-taxon/' + taxon['sub-taxons'][0].id;
      }
      return link;
    };
  })
  .filter('imageSize', function() {
    return function(image, size) {
      if (image === undefined) {
        return '';
      }
      return image.replace('large', size);
    };
  });
;