'use strict';

angular.module('2ViVe', []);

angular.module('miioonApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/signin', {
        templateUrl: 'views/signIn.html',
        controller: 'SignInController'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/taxon/:taxonId', {
        templateUrl: 'views/taxon.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
