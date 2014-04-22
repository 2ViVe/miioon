'use strict';

angular.module('2ViVe', []);

angular.module('miioonApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  '2ViVe',
  'ui.utils',
  'mm.foundation.tabs',
  'duScroll'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/signin', {
        templateUrl: 'views/sign-in.html',
        controller: 'SignInController'
      })
      .when('/signup', {
        templateUrl: 'views/sign-up/all.html',
        controller: 'SignUpController'
      })
      .when('/retial-signup', {
        templateUrl: 'views/retail-signup.html',
        controller: 'RetailSignUpController'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/taxon/:taxonId', {
        templateUrl: 'views/taxon.html',
        controller: 'TaxonController'
      })
      .when('/product/:productId', {
        templateUrl: 'views/product-detail.html',
        controller: 'ProductController'
      })
      .when('/taxon/:taxonId/sub-taxon/:subTaxonId', {
        templateUrl: 'views/taxon.html',
        controller: 'TaxonController'
      })
      .when('/host', {
        templateUrl: 'views/host.html'
      })
      .when('/press', {
        templateUrl: 'views/press.html',
        controller: 'PressController'
      })
      .when('/brand', {
        templateUrl: 'views/brand.html'
      })
      .when('/career', {
        templateUrl: 'views/career.html'
      })
      .when('/gift/gift-card', {
        templateUrl: 'views/gift/gift-card.html',
        controller: 'GiftController'
      })
      .when('/gift/checkout', {
        templateUrl: 'views/gift/gift-checkout.html'
      })
      .when('/shopping', {
        templateUrl: 'views/shopping.html',
        controller: 'ShoppingController'
      })
      .when('/t-c', {
        templateUrl: 'views/t-c.html'
      })
      .when('/printing', {
        templateUrl: 'views/printing.html'
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);