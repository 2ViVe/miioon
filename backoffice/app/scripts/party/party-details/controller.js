'use strict';

angular.module('miioon/party')
  .controller('PartyDetailsController', ['$scope', '$modal', 'event', '$q', '$timeout',
    function($scope, $modal, event, $q, $timeout) {

      $scope.event = event;
      $scope.party = event.data;
      $scope.invitees = event.invitees;

      $scope.rewords = 0;
      $scope.halfPriceItems = 0;
      $scope.rewordsPercentage = undefined;
      var ordersItemTotal = event.ordersItemTotal();
      if (ordersItemTotal >= 300 && ordersItemTotal < 501) {
        $scope.rewords = 25;
        $scope.halfPriceItems = 2;
      } else if (ordersItemTotal >= 501 && ordersItemTotal < 801) {
        $scope.rewords = 75;
        $scope.halfPriceItems = 3;
      } else if (ordersItemTotal >= 801) {
        $scope.rewords = 150;
        $scope.halfPriceItems = 4;
      }

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