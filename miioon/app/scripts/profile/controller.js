'use strict';

angular.module('miioonApp')
  .controller('ProfileController', ['$scope', 'profile', 'address', function($scope, profile, address) {

    $scope.profile = profile;
    $scope.address = address;

    $scope.saveAccountInfo = function() {
      $scope.editingAccount = !$scope.editingAccount;
    };

    $scope.savePassword = function() {
      $scope.editingPassword = !$scope.editingPassword;
    };

    $scope.savePersonalInfo = function() {
      $scope.editingPersonalInfo = !$scope.editingPersonalInfo;
    };


  }]);
