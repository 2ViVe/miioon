'use strict';

angular.module('2ViVe')
  .controller('NewsDetailController', ['$scope', 'news', function($scope, news) {
    $scope.news = news;
  }]);