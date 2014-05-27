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
  })
  .filter('price', function() {
    return function(price) {
      return parseFloat(Math.round(price * 100) / 100).toFixed(2);
    };
  });