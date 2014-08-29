'use strict';

angular
  .module('miioon/shopping', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ipCookie',
    'mm.foundation.modal'
  ])
  .config(['$routeProvider', function($routeProvider) {
    var optionsResolve = function(checkoutUrl) {
      return {
        events: ['newEvents', 'LocalStorage', '$q',
          function(Events, LocalStorage, $q) {
            var defer = $q.defer();

            var replicateOwner = LocalStorage.getReplicateOwner();
            var userId = replicateOwner ? replicateOwner['user-id'] : undefined;
            var events = new Events();
            events.fetchTypes()
              .then(function(events) {
                return events.fetchAll({
                  userId: userId
                });
              })
              .then(function(events) {
                var activeEvents = events.getByOptions({
                  isActive: true
                });
                if (!activeEvents || activeEvents.length === 0) {
                  defer.reject({
                    goTo: checkoutUrl
                  });
                }
                defer.resolve(events);
              }).catch(function() {
                defer.reject({
                  goTo: checkoutUrl
                });
              });

            return defer.promise;
          }]
      };
    };

    $routeProvider
      .when('/gift-shopping-options', {
        templateUrl: 'views/shopping/options.html',
        controller: 'GiftShoppingOptionsController',
        resolve: optionsResolve('/gift/checkout')
      })
      .when('/shopping-options', {
        templateUrl: 'views/shopping/options.html',
        controller: 'ShoppingOptionsController',
        resolve: optionsResolve('/checkout')
      })
      .when('/shopping', {
        templateUrl: 'views/shopping/shopping.html',
        controller: 'ShoppingController',
        resolve: {
          shopping: ['Shopping', function(Shopping) {
            return Shopping.fetch();
          }]
        }
      });
  }]);
