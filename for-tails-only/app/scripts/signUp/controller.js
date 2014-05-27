'use strict';
angular.module('fto/signup')
  .controller('SignUpController', ['Registration/DistributorData', '$routeParams', '$scope',
    function(DistributorData, $routeParams, $scope) {
      $scope.data = DistributorData;

      $scope.stepNumber = $routeParams.stepNumber;
      $scope.submitAndGoToStep = function(stepNumber, isFormValid) {
        $scope.submitted = true;
        if (isFormValid) {
        }
      };
      $scope.goToStep = function(stepNumber) {
        if (stepNumber !== $scope.stepNumber) {
        }
      };
    }]);