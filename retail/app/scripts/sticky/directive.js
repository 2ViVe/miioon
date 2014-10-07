'use strict';

angular.module('2ViVe')
  .directive('sticker',
  function() {
    return {
      restrict: 'C',
      link: function(scope, element) {
        angular.element(element).sticky({
          topSpacing:10
        });
      }
    };
  });