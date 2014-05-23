'use strict';

angular.module('2ViVe')
  .controller('SignInController', ['$scope', 'User', '$location',
    function($scope, User, $location) {
      var user = new User();

      $scope.signIn = function() {
        user.login($scope.username, $scope.password, 'test_client_id_1')
          .success(function() {
            $location.path('/');
          }).error(function(data) {
            console.log('failed');
            console.log(data);
          });
      };
    }]);
