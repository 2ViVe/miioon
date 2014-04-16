'use strict';

angular.module('2ViVe')
  .controller('HeaderController', ['$scope', 'Profile',
    function($scope, Profile) {
      $scope.profile = Profile;
  }]);
