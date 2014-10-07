'use strict';

angular.module('miioon/signup')
  .directive('signUpStep2', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {
        $scope.nextStep = function() {
          if (this.step2.$valid) {
            $scope.goToNextStep();
          }
        };
      }]
    };
  }]);