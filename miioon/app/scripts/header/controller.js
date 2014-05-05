'use strict';

angular.module('2ViVe')
  .controller('HeaderController', ['$scope', 'User', '$window', 'Shopping', 'UrlHandler',
    function($scope, User, $window, Shopping, UrlHandler) {
      $scope.user = User;
      $scope.shopping = Shopping;
      $scope.backOfficeUrl = UrlHandler.backOfficeUrl();

      $scope.logout = function() {
        User.logout().success(function() {
          $window.location.href = '/';
        });
      };
    }]);
