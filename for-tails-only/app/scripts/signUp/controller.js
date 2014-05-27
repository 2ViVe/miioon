'use strict';
angular.module('fto/signup')
  .controller('SignUpController', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {
      $scope.stepNumber = $routeParams.stepNumber;
      $scope.submitAndGoToStep = function(stepNumber, isFormValid) {
        $scope.submitted = true;
        if (isFormValid) {
          $location.path('/signup/' + stepNumber);
        }
      };
      $scope.goToStep = function(stepNumber) {
        if (stepNumber !== $scope.stepNumber) {
          $location.path('/signup/' + stepNumber);
        }
      };
    }]);