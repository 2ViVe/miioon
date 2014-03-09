'use strict';

angular.module('2ViVe')
  .controller('SignInController', ['$scope', 'User', function($scope, User) {
    $scope.signIn = function() {
      User.login({
        username: $scope.username,
        password: $scope.password
      });
    }
  }]);
