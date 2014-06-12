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
          countries: ['Registration.Countries', function(Countries) {
            return Countries.fetch();
          }]
        }
      })
      .when('/retail-signup', {
        templateUrl: 'views/sign-up/retail-signup.html',
        controller: 'RetailSignUpController',
        resolve: {
          countries: ['Registration.Countries', function(Countries) {
            return Countries.fetch();
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
      .when('/fundraising', {
        templateUrl: 'views/fundraising.html',
        controller: 'FundraisingController'
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
          order: ['Shopping', 'Order', '$location',
            function(Shopping, Order, $location) {
              return Shopping.fetch().then(function(shopping) {
                return Order.checkout(shopping.items)
                  .catch(function() {
                    $location.path('/signin');
                  });
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