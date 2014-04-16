'use strict';

angular.module('2ViVe')
  .controller('HeaderController', ['$scope', 'Profile', 'User', '$window',
    function($scope, Profile, User, $window) {
      $scope.profile = Profile;

      $scope.logout = function() {
        User.logout();
        $window.location.href = '/';
      }
  }]);
