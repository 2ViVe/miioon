'use strict';

angular.module('miioon/shopping')
  .controller('ShoppingOptionsController', ['$scope', 'events', 'Shopping', '$location', 'User', 'LocalStorage', 'GiftCard',
    function($scope, events, Shopping, $location, User, LocalStorage, GiftCard) {
      User.fetch().catch(function() {
        LocalStorage.setPathAfterLogin('/shopping-options');
        $location.path('/signin');
      });

      $scope.types = events.getTypesWithActiveEvent();
      $scope.selectedType = $scope.types[0];

      var activeEvents = events.getByOptions({
        isActive: true,
        typeId: $scope.selectedType.id
      });
      $scope.events = activeEvents;
      $scope.selectedEvent = activeEvents[0];

      $scope.changeType = function() {
        activeEvents = events.getByOptions({
          isActive: true,
          typeId: $scope.selectedType.id
        });
        $scope.events = activeEvents;
        $scope.selectedEvent = activeEvents[0];
      };

      var giftCard = new GiftCard();

      $scope.shopForMySelf = function() {
        giftCard.unBindEvent();
        Shopping.removeOptionalField('eventCode');
        Shopping.update().then(function() {
          $location.path(Shopping.pathAfterShoppingOptions ?
            Shopping.pathAfterShoppingOptions : '/products/clothing/ruckjack-boys');
        });
      };

      $scope.shopForPawTy = function() {
        giftCard.bindEvent($scope.selectedEvent.id);
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
