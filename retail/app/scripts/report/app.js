'use strict';

angular
  .module('miioon/report', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ipCookie'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/report/order', {
        templateUrl: 'views/report/order.html',
        controller: 'OrderReportController',
        resolve: {
          orders: ['Order', function(Order) {
            return Order.recent(0, 25);
          }]
        }
      });
  }]);
