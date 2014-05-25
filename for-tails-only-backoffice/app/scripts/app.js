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
      })
      .when('/signup/:stepNumber', {
        templateUrl: 'views/sign-up/all.html',
        controller: 'SignUpController'
      })
      .when('/retail-signup', {
        templateUrl: 'views/sign-up/retail-signup.html'
      })
      .when('/quick-signup', {
        templateUrl: 'views/sign-up/quick-signup.html'
      })
      .when('/products/', {
        templateUrl: 'views/products/products-index.html',
        //controller: 'SignUpController'
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
      .when('/products/gift-detail', {
        templateUrl: 'views/products/products-gift-detail.html',
        //controller: 'SignUpController'
      })
      .when('/products/success', {
        templateUrl: 'views/products/products-success.html',
        //controller: 'SignUpController'
      })
      .when('/products/checkout', {
        templateUrl: 'views/products/products-checkout.html',
        //controller: 'SignUpController'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/party/party-my', {
        templateUrl: 'views/party/party-my.html'
      })
      .when('/party/party-none', {
        templateUrl: 'views/party/party-none.html'
      })
      .when('/party/party-invite', {
        templateUrl: 'views/party/party-invite.html'
      })
      .when('/party/party-contact', {
        templateUrl: 'views/party/party-contact.html'
      })
      .when('/party/party-details', {
        templateUrl: 'views/party/party-details.html'
      })
      .when('/taxon/:taxonId', {
        templateUrl: 'views/taxon.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
