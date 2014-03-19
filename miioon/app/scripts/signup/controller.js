'use strict';

angular.module('2ViVe')
  .controller('SignUpController', ['$scope',
    function($scope) {
      $scope.currentStepNumber = 3;
      $scope.completedStepNumber = 0;
      $scope.account = {};

      $scope.nextStep = function() {
        $scope.submitted = true;
        if (this.step.$valid) {
          $scope.currentStepNumber++;
          if ($scope.currentStepNumber > $scope.completedStepNumber) {
            $scope.completedStepNumber = $scope.currentStepNumber;
          }
        }
      };
      $scope.goToStep = function(stepNumber) {
        if (stepNumber <= $scope.completedStepNumber) {
          $scope.currentStepNumber = stepNumber;
        }
      };
      $scope.moreThanOld18 = function(date) {
        return moment(date).add(18, 'years').isBefore(moment());
      };
    }]);