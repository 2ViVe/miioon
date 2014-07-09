'use strict';

angular.module('miioon/party')
  .controller('PartyInvitationController', ['$scope', 'event', '$modal', '$route', 'templates',
    function($scope, event, $modal, $route, templates) {
      function openConfirm(response) {
        $modal.open({
          templateUrl: 'views/party/confirm.html',
          controller: 'PartyConfirmController',
          windowClass: 'medium',
          resolve: {
            response: function() {
              return response;
            },
            event: function() {
              return event;
            },
            inviteeId: function() {
              return inviteeId;
            }
          }
        }).result.then(function() {
            $scope.isChangingReply = false;
          });
      }


      $scope.event = event;
      $scope.isChangingReply = false;
      $scope.enableChangingReply = function() {
        $scope.isChangingReply = true;
      };

      var inviteeId = $route.current.params.inviteeId;
      $scope.response = function() {
        return event.getInviteeById(inviteeId).reply;
      };

      var response = $route.current.params.response;
      if (response && response !== $scope.response()) {
        openConfirm(response);
      }

      $scope.templateImageUrl = event.getTemplateImageUrlFrom(templates);

      $scope.confirm = openConfirm;

    }]);
