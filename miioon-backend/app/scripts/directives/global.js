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
  .directive('preLoadImageUrl',
  function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        angular.element('<img/>').attr('src', attrs.preLoadImageUrl);
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
            var brushImage = angular.element('<img/>').attr('src', brushImageUrl);
            brushImage.on('load', function() {
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
            });
          }
        }
      };
    }]);