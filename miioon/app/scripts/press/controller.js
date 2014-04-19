'use strict';

angular.module('2ViVe')
  .controller('PressController', ['$scope',
    function($scope) {
      $scope.pressImagesBig;
      $scope.pressImagesIndex = 1;
      $scope.isPopupHide = 1;

      $scope.showPopup = function(target) {
        $scope.pressImagesIndex = target.getAttribute('data');
        $scope.pressImagesBig = 'images/press/press-big-' + $scope.pressImagesIndex + '.jpg';
        $scope.isPopupHide = 0;
      };

      $scope.hidePopup = function() {
        $scope.isPopupHide = 1;
      };

    }
  ]);



