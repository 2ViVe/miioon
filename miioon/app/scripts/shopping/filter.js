'use strict';

angular.module('2ViVe')
  .filter('price', function() {
    return function(price) {
      return parseInt(price * 100) / 100;
    };
  });