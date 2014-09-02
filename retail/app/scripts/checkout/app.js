'use strict';

angular
  .module('miioon/checkout', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ipCookie',
    'mm.foundation.modal'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/checkout', {
        templateUrl: 'views/checkout/all.html',
        controller: 'CheckoutController',
        resolve: {
          order: ['Shopping', 'Order', '$location',
            function(Shopping, Order, $location) {
              return Shopping.fetch().then(function(shopping) {
                return Order.checkout(shopping)
                  .then(function(order) {

                    if (order.error) {
                      $location.path('/signin');
                      return;
                    }

                    if (order.data.lineItems && order.data.lineItems.length > 0) {
                      return order;
                    } else {
                      $location.path('/');
                    }

                  });
              });
            }]
        }
      });
  }]);
