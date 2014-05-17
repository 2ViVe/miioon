'use strict';

angular.module('2ViVe')
  .directive('facebookLikebox', function() {
    return {
      restirct: 'A',
      replace: 'true',
      templateUrl: 'views/facebook-likebox.html',
      link: function(scope, el) {
        try {
          /* global FB */
          FB.XFBML.parse(el[0]);
        }
        catch(e) {

        }
      }
    };
  });
