'use strict';

angular.module('2ViVe')
  .controller('SignInController', ['$scope', 'User', '$location', 'Profile',
    function($scope, User, $location, Profile) {
      $scope.isRemember = false;

      $scope.signIn = function() {
        User.login($scope.username, $scope.password)
          .success(function() {
            if ($scope.isRemember) {
              User.remember();
            } else {
              User.forget();
            }
            Profile.fetch();
            $location.path('/');
          });
      };
    }]);
