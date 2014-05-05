'use strict';

angular.module('2ViVe')
  .directive('img',
  function() {
    return {
      restrict: 'E',
      link: function(scope, element) {
        var image = angular.element(element);
        image.on('error', function() {
          image.attr('src', 'images/missing-product-300x300.jpg');
        });
      }
    };
  });