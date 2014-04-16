'use strict';

angular.module('2ViVe')
  .controller('SignInController', ['$scope', 'User', '$location', 'Profile',
    function($scope, User, $location, Profile) {
      $scope.signIn = function() {
        User.login($scope.username, $scope.password)
          .success(function() {
            Profile.fetch();
            $location.path('/');
          }).error(function(data) {
            console.log('failed');
            console.log(data);
          });
      };
    }]);
