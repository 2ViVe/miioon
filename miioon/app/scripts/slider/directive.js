'use strict';

angular.module('2ViVe')
  .directive('slider', function() {
    return {
      restrict: 'C',
      link: function(scope, element) {
        angular.element(element).unslider({
          dots: true,
          autoplay: false
        });
      }
    }
  });