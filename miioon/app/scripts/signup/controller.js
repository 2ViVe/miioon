'use strict';

angular.module('2ViVe')
  .controller('SignUpController', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {
      $scope.stepNumber = $routeParams.stepNumber;
      $scope.submitAndGoToStep = function(stepNumber, isFormValid) {
        $scope.submitted = true;
        if (isFormValid) {
          $location.path('/signup/' + stepNumber);
        }
      };
    }]);