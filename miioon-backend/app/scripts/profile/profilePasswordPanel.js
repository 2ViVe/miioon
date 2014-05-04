'use strict';

;(function() {

  angular.module('2ViVe')
    .controller('profilePasswordPanelCtrl', ['$scope', 'User', function($scope, User) {
      $scope.isEditing = false;
      $scope.isLoading = true;

      $scope.toggle = function() {
        $scope.isEditing = !$scope.isEditing;
      };

      $scope.save = function() {
        $scope.isLoading = true;
        User.updatepassword({
          oldPassword: $scope.oldPassword,
          newPassword: $scope.new
        })
      };
    }])
    .directive('profilePasswordPanel', function() {
      return {
        restrict: 'A',
        replace: true,
        templateUrl: '/views/profile/profile-password-panel.html',
        controller: 'profilePasswordPanelCtrl',
        scope: {},
        link: function(scope, elem, attrs) {
        }
      };
    });

})();


