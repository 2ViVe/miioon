'use strict';

angular
  .module('miioon/gift', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ipCookie'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/gift/gift-card', {
        templateUrl: 'views/gift/gift-card.html',
        controller: 'GiftController',
        resolve: {
          giftCard: ['GiftCard', function(GiftCard) {
            var giftCard = new GiftCard(4);
            return giftCard.fetch();
          }]
        }
      })
      .when('/gift/checkout', {
        templateUrl: 'views/gift/gift-checkout.html',
        controller: 'GiftCheckoutController'
      });
  }]);
