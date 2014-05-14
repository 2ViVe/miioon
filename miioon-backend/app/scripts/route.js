'use strict';

angular.module('miioonApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/order-shopping/9'
      })
      .when('/account', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController',
        resolve: {
          'profile': ['User', function(User) {
            return User.fetch();
          }],
          'address': ['Address', function(Address) {
            return Address.fetch();
          }]
        }
      })
      .when('/party/my-party', {
        templateUrl: 'views/party/my-party.html',
        controller: 'MyPartyController'
      })
      .when('/party/none-party', {
        templateUrl: 'views/party/none-party.html'
      })
      .when('/party/manage-guests', {
        templateUrl: 'views/party/manage-guests.html',
        controller: 'ManageGuestController'
      })
      .when('/party/party-customers', {
        templateUrl: 'views/party/party-customers.html'
      })
      .when('/party/party-email-selected', {
        templateUrl: 'views/party/party-email-selected.html'
      })
      .when('/party/party-email-view-invitation', {
        templateUrl: 'views/party/party-email-view-invitation.html'
      })
      .when('/party/rsvps', {
        templateUrl: 'views/party/rsvps.html'
      })
      .when('/party/party-orders', {
        templateUrl: 'views/party/party-orders.html',
        controller: 'PartyOrdersController'
      })
      .when('/party/start-shopping', {
        templateUrl: 'views/party/start-shopping.html'
      })
      .when('/party/party-create', {
        templateUrl: 'views/party/party-create.html'
      })
      .when('/party/party-invite-guests', {
        templateUrl: 'views/party/party-invite-guests.html'
      })
      .when('/gift-codes', {
        templateUrl: 'views/gift/code.html',
        controller: 'giftCodeCtrl'
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutController'
      })
      .when('/t-c', {
        templateUrl: 'views/t-c.html'
      })
      .when('/mentoring', {
        templateUrl: 'views/coming.html'
      })
      .when('/coming', {
        templateUrl: 'views/coming.html'
      })
      .when('/order-shopping/:taxonId', {
        templateUrl: 'views/product/taxon.html',
        controller: 'TaxonController'
      })
      .when('/product/:productId', {
        templateUrl: 'views/product/product-detail.html',
        controller: 'ProductController',
        resolve: {
          'product': ['Product', '$route', function(Product, $route) {
            var product = new Product($route.current.params.productId);
            return product.fetch();
          }]
        }
      })
      .when('/shopping', {
        templateUrl: 'views/shopping.html',
        controller: 'ShoppingController'
      })
      .when('/checkout', {
        templateUrl: 'views/checkout/all.html',
        controller: 'CheckoutController'
      })
      .when('/report', {
        templateUrl: 'views/report/order.html',
        controller: 'OrderReportController'
      })
      .when('/gift/gift-card', {
        templateUrl: 'views/gift/gift-card.html',
        controller: 'GiftController'
      })
      .when('/gift/checkout', {
        templateUrl: 'views/gift/gift-checkout.html',
        controller: 'GiftCheckoutController'
      })
      .when('/tools', {
        templateUrl: 'views/tools/train.html',
        controller: 'TrainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
