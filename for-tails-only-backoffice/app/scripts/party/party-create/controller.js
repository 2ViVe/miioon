'use strict';

angular.module('fto')
  //for party view invitation page
  .controller('PartyCreateController', ['$scope', '$modal',
    function($scope, $modal) {
      $scope.partyCreateContact = function() {
        $modal.open({
          templateUrl: 'views/party/party-create-contact.html',
          controller: 'PartyModalController',
          windowClass: 'medium',
          scope: $scope
        });
      };
    }]);
