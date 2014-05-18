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
        controller: 'GiftController',
        resolve: {
          giftCard: ['User', 'GiftCard', '$q', function(User, GiftCard, $q) {
            var deferred = $q.defer();
            var giftCard = new GiftCard();

            User.fetch().finally(function() {
              giftCard.fetch().success(function() {
                deferred.resolve(giftCard);
              });
            });

            return deferred.promise;
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
          shopping: ['Shopping', 'User', '$q', function(Shopping, User, $q) {
            var deferred = $q.defer();
            User.fetch().finally(function() {
              Shopping.fetch().then(function() {
                deferred.resolve(Shopping);
              });
            });
            return deferred.promise;
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
          order: ['Shopping', 'User', 'Order', '$q', '$location', 'LocalStorage',
            function(Shopping, User, Order, $q, $location, LocalStorage) {
              var deferred = $q.defer();
              User.fetch().then(function() {
                Shopping.fetch().then(function() {
                  Order.checkout(Shopping.items).then(function() {
                    deferred.resolve(Order);
                  });
                });
              }).catch(function() {
                LocalStorage.setPathAfterLogin($location.path());
                $location.path('/signin');
              });
              return deferred.promise;
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
