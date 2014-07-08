'use strict';

angular
  .module('miioon/checkout')
  .filter('byOptionType', function() {
    return function(options, type) {
      var presentation = '';
      angular.forEach(options, function(option) {
        if (option.type === type) {
          presentation = option.presentation;
        }
      });
      return presentation;
    };
  });