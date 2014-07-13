'use strict';

angular.module('2ViVe')
  .directive('creditcardPanel', [function() {
    return {
      restrict: 'A',
      templateUrl: function() {
        return 'views/sign-up/panels/credit-card-panel.html';
      },
      replace: true,
      scope: {
        creditcard: '='
      }
    };
  }]);