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
      .when('/meet/:eventId/invitee/:inviteeId/rsvp/:response?', {
        templateUrl: 'views/party/invitation.html',
        controller: 'PartyInvitationController',
        resolve: {
          'templates': ['Events',
            function(Events) {
              return Events.fetchTemplates();
            }],
          'event': ['Event', '$route',
            function(Event, $route) {
              var id = $route.current.params.eventId;
              var event = new Event(id);
              return event.fetch()
                .then(function() {
                  return event.fetchInvitees();
                })
                .then(function() {
                  return event;
                });
            }]
        }
      });
  }]);
