'use strict';

angular.module('2ViVe')
  .controller('HeaderController', ['$scope', 'User', '$window', 'Shopping', 'UrlHandler', 'LocalStorage',
    function($scope, User, $window, Shopping, UrlHandler, LocalStorage) {
      $scope.user = User;
      $scope.shopping = Shopping;
      $scope.backOfficeUrl = UrlHandler.backOfficeUrl();
      $scope.replicateOwner = LocalStorage.getReplicateOwner();

      $scope.logout = function() {
        User.logout().success(function() {
          $window.location.href = '/';
        });
      };
    }]);
