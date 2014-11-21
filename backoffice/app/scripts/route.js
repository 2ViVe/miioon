'use strict';

angular.module('miioonApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        resolve: {
          'news': ['News', function(News) {
            var news = new News();
            return news.fetch('',3);
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
        controller: 'giftCodeCtrl',
        resolve: {
          'giftcodes': ['GiftCards', function(GiftCards) {
            return GiftCards.fetch();
          }]
        }
      })
      .when('/t-c', {
        templateUrl: 'views/t-c.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact-us.html'
      })
      .when('/printing', {
        templateUrl: 'views/printing.html'
      })
      .when('/shipping-returns', {
        templateUrl: 'views/shipping-returns.html'
      })
      .when('/mentoring', {
        templateUrl: 'views/coming.html'
      })
      .when('/coming', {
        templateUrl: 'views/coming.html'
      })
      .when('/products/marketing-materials/items', {
        templateUrl: 'views/product/marketing-materials.html',
        controller: 'MarketingMaterialsController',
        resolve: {
          products: ['Products', function(Products) {
            var MarketingMaterialsTaxonId = 21;
            var MarketingMaterialsCatalogCode = 'MM';

            return Products.getByTaxon(MarketingMaterialsTaxonId, MarketingMaterialsCatalogCode);
          }]
        }
      })
      .when('/products/:taxonPermalink/:subTaxonPermalink?', {
        templateUrl: 'views/product/taxon.html',
        controller: 'TaxonController',
        resolve: {
          taxons: ['Taxons', function(Taxons) {
            return Taxons.fetch();
          }]
        }
      })
      .when('/product/:productId/:catalogCode?', {
        templateUrl: 'views/product/product-detail.html',
        controller: 'ProductController',
        resolve: {
          'product': ['Product', '$route',
            function(Product, $route) {
              var product = new Product($route.current.params.productId, $route.current.params.catalogCode);
              return product.fetch();
            }],
          'taxons': ['Taxons', function(Taxons) {
            return Taxons.fetch();
          }]
        }
      })
      .when('/report/orders', {
        templateUrl: 'views/report/order.html',
        controller: 'OrderReportController',
        resolve: {
          orders: ['Order', function(Order) {
            return Order.recent(0, 25);
          }]
        }
      })
      .when('/miioon-u', {
        templateUrl: 'views/tools/train.html',
        controller: 'TrainController'
      })
      .when('/e-wallet', {
        templateUrl: 'views/hyperwallet/index.html',
        controller: 'HyperWalletController',
        controllerAs: 'HyperWallet'
      })
      .when('/products/renewal-items', {
        templateUrl: 'views/product/renewal-items.html',
        controller: 'RenewalController',
        resolve: {
          products: ['Products', function(Products) {
            return Products.getByTaxon(2, 'RW');
          }]
        }
      })
  }]);
