'use strict';

angular.module('2ViVe')
  .controller('PartyOrdersController', ['$scope',
    function($scope) {
      $scope.isPopupHide = 1;

      $scope.showPopup = function() {
        $scope.isPopupHide = 0;
      };

      $scope.hidePopup = function() {
        $scope.isPopupHide = 1;
      };

    }
  ]);

