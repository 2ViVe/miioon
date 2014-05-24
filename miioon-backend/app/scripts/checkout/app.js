'use strict';

angular
  .module('miioon/checkout', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ipCookie'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/checkout', {
        templateUrl: 'views/checkout/all.html',
        controller: 'CheckoutController',
        resolve: {
          order: ['Shopping', 'Order',
            function(Shopping, Order) {
              return Shopping.fetch().then(function(shopping) {
                return Order.checkout(shopping.items);
              });
            }]
        }
      });
  }]);
