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
    $routeProvider
      .when('/signup', {
        redirectTo: '/signup/1'
      })
      .when('/signup/:stepNumber', {
        templateUrl: 'views/sign-up/all.html',
        controller: 'SignUpController'
      });
  }]);
