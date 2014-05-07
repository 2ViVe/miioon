'use strict';

angular.module('2ViVe')
  .controller('NavigationController', ['$scope', 'UrlHandler',
    function($scope, UrlHandler) {
      $scope.retailUrl = UrlHandler.retailUrl();
    }]);
