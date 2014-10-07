'use strict';

/*
angular.module('2ViVe')
  .controller('PressController', ['$scope',
  function($scope) {
      $scope.pressImagesIndex = 1;
      $scope.isPopupHide = 1;

      $scope.showPopup = function(target) {
        $scope.pressImagesIndex = target.getAttribute('data');
        $scope.isPopupHide = 0;
      };

      $scope.hidePopup = function() {
        $scope.isPopupHide = 1;
      };
    }
  ]);

*/

angular.module('2ViVe')
  .controller('PressController', ['$scope', '$modal',
    function($scope, $modal) {
      $scope.pressImagesIndex = 1;
      $scope.isPopupHide = 1;

      $scope.showPopup = function(target) {
        $scope.pressImagesIndex = target.getAttribute('data');
        $modal.open({
          templateUrl: 'views/press-popup.html',
          controller: 'PressModalController',
          scope: $scope
        });
      };
    }
  ])
  .controller('PressModalController', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);


