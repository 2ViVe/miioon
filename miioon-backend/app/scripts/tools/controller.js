'use strict';

angular.module('2ViVe')
  .controller('TrainController', ['$scope', 'Tools', function($scope, Tools) {
    Tools.fetch().then(function(result) {
      $scope.filesArr = result;
    });
  }]);