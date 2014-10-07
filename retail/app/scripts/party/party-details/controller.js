'use strict';

angular.module('miioon/party')
  .controller('PartyDetailsController', ['$scope', '$modal', 'event', '$q', '$timeout',
    function($scope, $modal, event, $q, $timeout) {

      $scope.event = event;
      $scope.party = event.data;
      $scope.invitees = event.invitees;


      $scope.deleteInvites = function() {
        $modal.open({
          templateUrl: 'views/party/party-delete-modal.html',
          controller: 'PartyDeleteController',
          windowClass: 'medium',
          scope: $scope,
          resolve: {
            event: function() {
              var deferred = $q.defer();
              $timeout(function() {
                deferred.resolve(event);
              });
              return deferred.promise;
            }
          }
        });
      };

      $scope.openDetail = function(order) {
        $modal.open({
          templateUrl: 'views/party/party-order-details.html',
          controller: 'PartyDetailsModalController',
          windowClass: 'medium',
          resolve: {
            order: function() {
              return order;
            }
          }
        });
      };
    }]);