'use strict';

(function() {

  angular.module('2ViVe')
    .controller('profileInfoPanelCtrl', ['$scope', 'User', 'Registration', function($scope, User, Registration) {
      $scope.isEditing = false;
      $scope.isLoading = true;
      $scope.submitted = false;

      $scope.passwords = {
        newPassword: '',
        oldPassword: ''
      };

      User.fetch().then(function(result) {
        $scope.profile = result;
        $scope.isLoading = false;
        $scope.initProfile = angular.copy($scope.profile);
      });

      Registration.countries().then(function(result) {
        $scope.countries = result;
      });

      $scope.toggle = function() {
        $scope.isEditing = !$scope.isEditing;
      };

      $scope.changePassword = function(isValid) {
        $scope.submitted = true;
        if (!isValid) {
          return;
        }
        $scope
          .profile
          .updatePassword($scope.passwords).then(function() {
            $scope.isEditing = false;
            $scope.submitted = false;
            $scope.$errors = {};
          })
          .catch(respErrHandler);

      };

      $scope.getStates = function(selectedCountryId) {
        angular.forEach($scope.countries, function(country) {
          if (country.id === selectedCountryId) {
            $scope.states = country.states;
            return;
          }
        });
        return $scope.states;
      };

      function respErrHandler(resp) {
        $scope.isLoading = false;
        $scope.isEditing = true;
        if (!resp.data.meta || !resp.data.meta.error) { return ; }
        var error = resp.data.meta.error;
        $scope.$errors = {};
        $scope.$errors[error.errorCode] = error.message;
      }

      $scope.save = function() {
        $scope.submitted = true;
        $scope.isLoading = true;
        $scope
          .profile
          .save()
          .then(function() {
            $scope.isLoading = false;
            $scope.isEditing = false;
          })
          .catch(respErrHandler);
      };
    }])
    .directive('profileInfoPanel', function() {
      return {
        restrict: 'A',
        replace: true,
        templateUrl: '/views/profile/profile-info-panel.html',
        controller: 'profileInfoPanelCtrl',
        scope: {},
        link: function(scope, elem, attrs) {
        }
      };
    });

})();

