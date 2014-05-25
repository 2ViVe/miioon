'use strict';

angular
  .module('fto/signup')
  .directive('accountPanel', [function() {
    return {
      templateUrl: 'views/sign-up/components/account-panel.html',
      scope: {
        account: '='
      }
    };
  }]);
