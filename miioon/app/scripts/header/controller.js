'use strict';

angular.module('2ViVe')
  .controller('HeaderController', ['$scope', 'Profile', 'User', '$window', 'Shopping',
    function($scope, Profile, User, $window, Shopping) {
      $scope.profile = Profile;
      $scope.shopping = Shopping;

      $scope.logout = function() {
        User.logout();
        $window.location.href = '/';
      }
  }]);
