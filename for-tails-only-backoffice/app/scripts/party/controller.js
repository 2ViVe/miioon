'use strict';

angular.module('ftoApp')
  //for party view invitation page
  .controller('PartyInvitationController', ['$scope', '$modal',
    function($scope, $modal) {
      $scope.partyInviteConfirm = function() {
        $modal.open({
          templateUrl: 'views/party/party-invite-confirm.html',
          controller: 'PartyModalController',
          windowClass: 'medium',
          scope: $scope
        });
      };
    }])
  .controller('PartyModalController', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]
);