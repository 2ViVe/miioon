'use strict';

angular.module('miioon/shopping')
  .controller('ShoppingOptionsController', ['$scope', 'events', 'Shopping', '$location', 'User', 'LocalStorage',
    function($scope, events, Shopping, $location, User, LocalStorage) {
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

      $scope.shopForMySelf = function() {
        Shopping.removeOptionalField('eventCode');
        Shopping.update().then(function() {
          $location.path('/checkout');
        });
      };

      $scope.shopForPawTy = function() {
        Shopping.addOptionalFields({
          eventCode: $scope.selectedEvent.id
        });
        Shopping.update().then(function() {
          $location.path('/checkout');
        });
      };
    }
  ]);
