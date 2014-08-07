'use strict';

angular
  .module('miioon/party', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/meet/overview/:period/:typeId?', {
        templateUrl: 'views/party/my-party.html',
        controller: 'PartyLandingController',
        resolve: {
          types: ['Events', function(Events) {
            return Events.fetchTypes();
          }],
          events: ['Events', '$route', '$q', function(Events, $route, $q) {
            var defer = $q.defer();
            var typeId = $route.current.params.typeId;

            Events.fetchTypes()
              .then(function(types) {
                if (!typeId) {
                  defer.reject({
                    goTo: '/meet/overview/' +  $route.current.params.period + '/' + types[0].id
                  });
                }
                return Events.fetchAll();
              })
              .then(function(events) {
                if (events.length > 0) {
                  defer.resolve(events.filter(function(event) {
                    return event.typeId === typeId;
                  }));
                } else {
                  defer.reject({
                    goTo: '/meet/overview'
                  });
                }
              });

            return defer.promise;
          }]
        }
      })
      .when('/meet/overview', {
        templateUrl: 'views/party/none-party.html'
      })
      .when('/meet/:partyId/invite', {
        templateUrl: 'views/party/invite.html',
        controller: 'PartyInviteController',
        resolve: {
          event: ['Event', '$route', function(Event, $route) {
            var event = new Event($route.current.params.partyId);
            return event.fetch();
          }]
        }
      })
      .when('/meet/:eventId/edit', {
        templateUrl: 'views/party/party-create.html',
        controller: 'PartyEditController',
        resolve: {
          event: ['Event', '$route', function(Event, $route) {
            var event = new Event($route.current.params.eventId);
            return event.fetch();
          }],
          events: ['newEvents', function(Events) {
            var events = new Events();
            return events.fetchTemplates()
              .then(function(events) {
                return events.fetchTypes();
              });
          }],
          country: ['Countries', 'Address', function(Countries, Address) {
            return Countries.fetch().then(function(countries) {
              var homeAddress = Address.create('home');
              return homeAddress.fetch().then(function(address) {
                var homeCountry = null;
                angular.forEach(countries, function(country) {
                  if (country.id === address.countryId) {
                    homeCountry = country;
                  }
                });
                return homeCountry;
              });
            });
          }]
        }
      })
      .when('/meet/create', {
        templateUrl: 'views/party/party-create.html',
        controller: 'PartyCreateController',
        resolve: {
          events: ['newEvents', function(Events) {
            var events = new Events();
            return events.fetchTemplates()
              .then(function(events) {
                return events.fetchTypes();
              });
          }],
          country: ['Countries', 'Address', function(Countries, Address) {
            return Countries.fetch().then(function(countries) {
              var homeAddress = Address.create('home');
              return homeAddress.fetch().then(function(address) {
                var homeCountry = null;
                angular.forEach(countries, function(country) {
                  if (country.id === address.countryId) {
                    homeCountry = country;
                  }
                });
                return homeCountry;
              });
            });
          }]
        }
      })
      .when('/meet/:partyId', {
        templateUrl: 'views/party/detail.html',
        controller: 'PartyDetailsController',
        resolve: {
          event: ['Event', '$route', function(Event, $route) {
            var id = $route.current.params.partyId;
            var event = new Event(id);
            return event
              .fetch()
              .then(function() {
                return event.fetchInvitees();
              })
              .then(function() {
                return event.fetchOrders();
              })
              .then(function() {
                return event;
              });
          }]
        }
      });
  }]);
