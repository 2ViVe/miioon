'use strict';

angular
  .module('fto/signup')
  .directive('addressField', function() {
    return {
      require: '^form',
      replace: true,
      templateUrl: 'views/sign-up/components/address-text-field.html',
      transclude: true,
      scope: {
        addressType: '&',
        name: '@',
        label: '@',
        required: '@'
      },
      link: function(scope, element) {
      }
    };
  });
