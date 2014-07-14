'use strict';

angular.module('miioon/shopping')
  .controller('ShoppingOptionsController', ['$scope', 'events', 'Shopping', '$location',
    function($scope, events, Shopping, $location) {
      $scope.events = events;
      $scope.selectedEvent = events[0];

      $scope.shopForMySelf = function() {
        Shopping.removeOptionalField('eventCode');
        Shopping.update().then(function() {
          $location.path(Shopping.pathAfterShoppingOptions ?
            Shopping.pathAfterShoppingOptions : '/products/clothing/ruckjack-boys');
        });
      };

      $scope.shopForPawTy = function() {
        Shopping.addOptionalFields({
          eventCode: $scope.selectedEvent.id
        });
        Shopping.update().then(function() {
          $location.path(Shopping.pathAfterShoppingOptions ?
            Shopping.pathAfterShoppingOptions : '/products/clothing/ruckjack-boys');
        });
      };
    }
  ]);
