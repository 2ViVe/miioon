'use strict';

angular.module('miioonApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signIn.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
