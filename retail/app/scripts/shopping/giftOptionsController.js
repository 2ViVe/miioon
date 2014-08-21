'use strict';

angular.module('miioon/shopping')
  .controller('GiftShoppingOptionsController', ['$scope', 'events', 'Shopping', '$location', 'User', 'LocalStorage', 'GiftCard',
    function($scope, events, Shopping, $location, User, LocalStorage, GiftCard) {
      User.fetch().catch(function() {
        LocalStorage.setPathAfterLogin('/gift-shopping-options');
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
        $location.path('/gift/checkout');
      };

      $scope.shopForPawTy = function() {
        giftCard.bindEvent($scope.selectedEvent.id);
        $location.path('/gift/checkout');
      };
    }
  ]);
