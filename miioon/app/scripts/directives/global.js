'use strict';

angular.module('2ViVe')
  .directive('img',
  function() {
    return {
      restrict: 'E',
      link: function(scope, element) {
        var image = angular.element(element);
        image.on('error', function() {
          image.attr({
            'src': 'images/missing-product-300x300.jpg',
            'not-found': 'true'
          });
        });
      }
    };
  })
  .directive('brushImageUrl', ['$timeout',
    function($timeout) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var brushImageUrl = attrs.brushImageUrl;
          if (brushImageUrl !== 'http://demo.abovegem.com:11442') {
            var brushImage = new Image();
            brushImage.src = brushImageUrl;
            $timeout(function() {
              var image = angular.element(element).find('img');
              var originalImageUrl = image.attr('src');
              angular.element(element).hover(function() {
                if (image.attr('not-found') === 'true') {
                  return;
                }
                image.attr('src', brushImageUrl);
              }, function() {
                if (image.attr('not-found') === 'true') {
                  return;
                }
                image.attr('src', originalImageUrl);
              });
            }, 0);
          }
        }
      }
    }]);