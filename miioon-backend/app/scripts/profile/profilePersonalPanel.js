'use strict';

(function() {

  angular.module('2ViVe')
    .controller('profilePersonalPanelCtrl', ['$scope', 'User', function($scope, User) {
      $scope.isEditing = false;
      $scope.isLoading = true;

      User.fetch().then(function(result) {
        $scope.profile = result;
        $scope.isLoading = false;
      });

      $scope.toggle = function() {
        $scope.isEditing = !$scope.isEditing;
      };

      $scope.save = function() {
        $scope.isLoading = true;
        $scope
          .profile
          .save()
          .then(function() {
            $scope.isLoading = false;
            $scope.isEditing = false;
          })
          .catch(function() {
            $scope.isLoading = false;
            $scope.isEditing = true;
          });
      };
    }])
    .directive('profilePersonalPanel', function() {
      return {
        restrict: 'A',
        replace: true,
        templateUrl: '/views/profile/profile-personal-panel.html',
        controller: 'profilePersonalPanelCtrl',
        scope: {},
        link: function(scope, elem, attrs) {
        }
      };
    });

})();

