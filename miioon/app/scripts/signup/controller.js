'use strict';

angular.module('2ViVe')
  .controller('SignUpController', ['$scope',
    function($scope) {
      $scope.currentStepNumber = 3;
      $scope.completedStepNumber = 0;
      $scope.shouldValidateRemotlyOnSubmit = false;
      $scope.isRemoteValidated = false;
      $scope.submitted = false;
      $scope.account = {};
      $scope.payment = {};

      function goToNextStep() {
        $scope.currentStepNumber++;
        if ($scope.currentStepNumber > $scope.completedStepNumber) {
          $scope.completedStepNumber = $scope.currentStepNumber;
        }
      }

      $scope.nextStep = function() {
        $scope.submitted = true;
        if (this.step.$valid) {
          if ($scope.shouldValidateRemotlyOnSubmit) {
            var destroyIsRemoteValidatedWatch = $scope.$watch($scope.isRemoteValidated, function() {
              if ($scope.isRemoteValidated) {
                destroyIsRemoteValidatedWatch();
                $scope.isRemoteValidated = false;
                goToNextStep();
              }
            });
          } else {
            goToNextStep();
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