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
    $routeProvider
      .when('/shopping-options', {
        templateUrl: 'views/shopping/options.html',
        controller: 'ShoppingOptionsController',
        resolve: {
          events: ['newEvents', 'LocalStorage', '$q',
            function(Events, LocalStorage, $q) {
              var defer = $q.defer();

              var replicateOwner = LocalStorage.getReplicateOwner();
              var userId = replicateOwner ? replicateOwner['user-id'] : undefined;
              var events = new Events();
              events.fetchAll({
                userId: userId
              }).then(function(events) {
                var activeEvents = events.getActive();
                if (!activeEvents || activeEvents.length === 0) {
                  defer.reject({
                    goTo: '/checkout'
                  });
                }
                defer.resolve(activeEvents);
              }).catch(function() {
                defer.reject({
                  goTo: '/checkout'
                });
              });

              return defer.promise;
            }]
        }
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
