'use strict';

angular.module('2ViVe')
  .controller('SignInController', ['$scope', 'User', '$location',
    function($scope, User, $location) {
      $scope.signIn = function() {
        User.login($scope.username, $scope.password)
          .success(function() {
            $location.path('/');
          }).error(function(data) {
            console.log('failed');
            console.log(data);
          });
      };
    }]);
