'use strict';

angular.module('2ViVe', []);

angular.module('miioonApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/signin', {
        templateUrl: 'views/sign-in.html',
        controller: 'SignInController'
      })
      .when('/signup', {
        redirectTo: '/signup'
        //templateUrl: 'views/sign-up/all.html'
      })
      .when('/signup/:stepNumber', {
        templateUrl: 'views/sign-up/all.html',
        controller: 'SignUpController'
      })
      .when('/products/list', {
        templateUrl: 'views/products/products-list.html',
        //controller: 'SignUpController'
      })
      .when('/products/cart', {
        templateUrl: 'views/products/products-cart.html',
        //controller: 'SignUpController'
      })
      .when('/products/detail', {
        templateUrl: 'views/products/products-detail.html',
        //controller: 'SignUpController'
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