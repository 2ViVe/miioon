'use strict';

angular.module('miioon/party')
  .controller('PartyInviteController', ['$scope', 'event', 'Validator', '$location',
    function($scope, event, Validator, $location) {
      $scope.event = event.data;

      $scope.subject = event.data.title;
      $scope.message = event.data.description;
      $scope.invitees = [];
      $scope.hasInvalidEmail = false;
      $scope.totalCount = event.totalInviteesNumber();

      function isEmailNotExited(email) {
        var isNotExited = true;
        angular.forEach($scope.invitees, function(invitee) {
          if (invitee.email === email) {
            isNotExited = false;
            return null;
          }
        });
        return isNotExited;
      }

      $scope.addInvitees = function() {
        $scope.hasInvalidEmail = false;
        var inviteesToBeAdded = $scope.inviteesToBeAdded.split(',');
        var inviteesLeft = [];

        angular.forEach(inviteesToBeAdded, function(inviteeToBeAdded) {
          var email = inviteeToBeAdded;
          var name = email.split('@')[0];
          if (!Validator.isEmail(email)) {
            inviteesLeft.push(email);
            $scope.hasInvalidEmail = true;
          } else if (isEmailNotExited(email)) {
            $scope.totalCount++;
            $scope.invitees.push({
              email: email,
              firstName: name
            });
          }
        });

        $scope.inviteesToBeAdded = inviteesLeft.join(',');
      };

      $scope.submit = function() {
        event.addInvitees($scope.invitees, $scope.subject, $scope.message)
          .then(function() {
            $location.path('/meet/' + event.data.id);
          }).catch(function(error) {
            $scope.error = error.data.meta.error.message;
          });
      };
    }]);
