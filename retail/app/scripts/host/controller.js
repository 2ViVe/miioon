'use strict';

angular.module('2ViVe')
  .controller('HostController', ['$scope', '$modal', function($scope, $modal) {
    $scope.showMailChimp = function() {
      $modal.open({
        templateUrl: 'views/sign-up/mail-chimp.html',
        controller: 'ChimpModalController',
        windowClass: 'medium',
        scope: $scope
      });
    };
  }]);
