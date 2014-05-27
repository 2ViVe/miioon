'use strict';

angular.module('ftoApp')
  //for party view invitation page
  .controller('PartyContactController', ['$scope', '$modal',
    function($scope, $modal) {
      $scope.partyAddContact = function() {
        $modal.open({
          templateUrl: 'views/party/party-add-contact.html',
          controller: 'PartyModalController',
          windowClass: 'medium',
          scope: $scope
        });
      };
    }]);
