'use strict';

angular.module('miioon/party')
  .controller('PartyConfirmController', ['$scope', '$modalInstance', 'response', 'event', 'inviteeId', '$q',
    function($scope, $modalInstance, response, event, inviteeId, $q) {
      $scope.data = {
        response: response,
        message: ''
      };
      $scope.submit = function() {
        event.response(inviteeId, $scope.data.response, $scope.data.message)
          .then(function() {
            $q.all([event.fetch(), event.fetchInvitees() ])
              .then(function() {
                $modalInstance.close();
              });
          });
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }]);