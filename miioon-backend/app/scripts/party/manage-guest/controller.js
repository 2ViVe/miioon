'use strict';

angular.module('2ViVe')
  .controller('ManageGuestController', ['$scope',
    function($scope) {
      $scope.guestSaved = true;

      $scope.guestItems = [
        {name: 'Jackson Ku', email: 'jacksonKu@abouts.com',rsvp: 'Yes'},
        {name: 'Jackson Lu', email: 'jacksonLu@abouts.com',rsvp: 'Yes'},
        {name: 'Jackson Za', email: 'jacksonZu@abouts.com',rsvp: 'Yes'},
        {name: 'Jackson Ha', email: 'jacksonHa@abouts.com',rsvp: 'No'},
        {name: 'Jackson Yiu', email: 'jacksonYiu@abouts.com',rsvp: 'Yes'},
        {name: 'Jackson Hee', email: 'jacksonHee@abouts.com',rsvp: 'Yes'}
      ];
    }
  ]);

