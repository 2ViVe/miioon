angular.module('miioonApp')
  .controller('ProfileController', ['$scope', function($scope) {
    $scope.username = 'USERNAME';
    $scope.email = 'EMAIL@EXAMPLE.com';

    $scope.saveAccountInfo = function() {
      $scope.editingAccount = !$scope.editingAccount;
    };

    $scope.savePassword = function() {
      $scope.editingPassword = !$scope.editingPassword;
    };


  }]);
