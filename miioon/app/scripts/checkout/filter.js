'use strict';

angular.module('2ViVe')
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