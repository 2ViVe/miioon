'use strict';

angular.module('2ViVe')
  .controller('HostController', function($scope, $location, $anchorScroll, $routeParams) {
  $scope.scrollTo = function(id) {
     $location.hash(id);
     $anchorScroll();
  }
});
