'use strict';

angular.module('miioonApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/signin', {
        templateUrl: 'views/sign-in.html',
        controller: 'SignInController'
      })
      .when('/signup', {
        templateUrl: 'views/sign-up/all.html',
        controller: 'SignUpController',
        resolve: {
          countries: ['Registration', function(Registration) {
            return Registration.countries();
          }]
        }
      })
      .when('/retail-signup', {
        templateUrl: 'views/sign-up/retail-signup.html',
        controller: 'RetailSignUpController',
        resolve: {
          countries: ['Registration', function(Registration) {
            return Registration.countries();
          }]
        }
      })
      .when('/account', {
        templateUrl: 'views/profile.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
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
      .when('/product/:productId', {
        templateUrl: 'views/product/product-detail.html',
        controller: 'ProductController',
        resolve: {
          'product': ['Product', '$route', function(Product, $route) {
            var product = new Product($route.current.params.productId);
            return product.fetch();
          }],
          'taxons': ['Taxons', function(Taxons) {
            return Taxons.fetch();
          }]
        }
      })
      .when('/host', {
        templateUrl: 'views/host.html',
        controller: 'HostController'
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
        controller: 'GiftController',
        resolve: {
          giftCard: ['GiftCard', function(GiftCard) {
            var giftCard = new GiftCard();
            return giftCard.fetch();
          }]
        }
      })
      .when('/gift/checkout', {
        templateUrl: 'views/gift/gift-checkout.html',
        controller: 'GiftCheckoutController'
      })
      .when('/shopping', {
        templateUrl: 'views/shopping.html',
        controller: 'ShoppingController',
        resolve: {
          shopping: ['Shopping', function(Shopping) {
            return Shopping.fetch();
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
      })
      .when('/starter-pack', {
        templateUrl: 'views/starter-pack.html'
        //controller: 'CheckoutController'
      })
      .when('/:login', {
        templateUrl: 'views/home.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
