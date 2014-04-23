'use strict';

angular.module('2ViVe')
  .controller('HeaderController', ['$scope', 'User', '$window', 'Shopping',
    function($scope, User, $window, Shopping) {
      $scope.user = User;
      $scope.shopping = Shopping;

      $scope.logout = function() {
        User.logout();
        $window.location.href = '/';
      };
    }]);
