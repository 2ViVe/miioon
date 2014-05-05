'use strict';

angular.module('2ViVe')
  .directive('zoomImage',
  function() {
    return {
      restrict: 'C',
      link: function(scope, element) {
        var image = angular.element(element);
        image.on('load', function() {
          image.elevateZoom({
            tint: true,
            tintColour: 'white',
            tintOpacity: 0.5
          });
        });
      }
    };
  });