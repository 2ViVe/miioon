'use strict';

angular.module('2ViVe')
  .filter('imageSize', function() {
    return function(image, size) {
      return image.replace('large', size);
    };
  });