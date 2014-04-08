'use strict';

angular.module('2ViVe')
  .controller('CareerController', function($scope, $location, $anchorScroll, $routeParams) {
    $scope.scrollTo = function(id) {
       $location.hash(id);
       $anchorScroll();
    };
});
