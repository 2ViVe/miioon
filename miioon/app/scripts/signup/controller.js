'use strict';

angular.module('2ViVe')
  .controller('SignUpController', ['$scope', '$routeParams',
    function($scope, $routeParams) {
      $scope.step = $routeParams.step;
    }]);
