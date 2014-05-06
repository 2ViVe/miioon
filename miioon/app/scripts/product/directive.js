'use strict';

angular.module('2ViVe')
  .directive('zoomImage',
  function() {
    return {
      restrict: 'C',
      link: function(scope, element) {
        var image = angular.element(element);
        var isError = false;
        image.on('error', function() {
          isError = true;
        });
        image.on('load', function() {
          if (isError) {
            return;
          }
          image.elevateZoom({
            tint: true,
            tintColour: 'white',
            tintOpacity: 0.5
          });
        });
      }
    };
  });