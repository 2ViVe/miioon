'use strict';

angular.module('2ViVe')
  .controller('MyPartyController', ['$scope',
    function($scope) {
        $scope.actionItems = [
          "Invite Guests",
          "Personalize & Settings",
          "View Meet Orders",
          "View Meet Customers",
          "Edit this Meet",
          "Delete this Meet"
        ];

        $scope.searchItems = [
          {name:'Shell Olson 1', date:'TUE 10/21'},
          {name:'Shell Olson 2', date:'TUE 10/22'},
          {name:'Shell Olson 3', date:'TUE 10/23'},
          {name:'Shell Olson 4', date:'TUE 10/24'}
        ];
    }
  ]);

