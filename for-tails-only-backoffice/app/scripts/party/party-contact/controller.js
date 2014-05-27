'use strict';

angular.module('fto')
  //for party view invitation page
  .controller('PartyContactController', ['$scope', '$modal',
    function($scope, $modal) {
      $scope.hahaha = 'hahahahahhaha';
      $scope.partyAddContact = function() {
        $modal.open({
          templateUrl: 'views/party/party-add-contact.html',
          controller: 'PartyModalController',
          windowClass: 'medium',
          scope: $scope
        });
      };
    }]);
