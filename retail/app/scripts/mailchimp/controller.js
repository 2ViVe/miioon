'use strict';

angular.module('2ViVe')
  .controller('MailChimpController', ['$scope', '$modal', function($scope, $modal) {
    $scope.showMailChimp = function() {
      $modal.open({
        templateUrl: 'views/sign-up/mail-chimp.html',
        controller: 'ChimpModalController',
        windowClass: 'medium',
        scope: $scope
      });
    };
  }])
  .controller('ChimpModalController', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);
