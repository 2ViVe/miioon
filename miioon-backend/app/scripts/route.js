'use strict';

angular.module('miioonApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/party/my-party', {
        templateUrl: 'views/party/my-party.html'
      })
      .when('/party/none-party', {
        templateUrl: 'views/party/none-party.html'
      })
      .when('/party/manage-guests', {
        templateUrl: 'views/party/manage-guests.html'
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
        templateUrl: 'views/party/party-orders.html'
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
      .otherwise({
        redirectTo: '/'
      });
  }]);