'use strict';

angular
  .module('fto/signup', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/quick-signup', {
      templateUrl: 'views/sign-up/quick-signup.html'
    });
  }]);
