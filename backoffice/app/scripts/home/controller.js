'use strict';

angular.module('2ViVe')
  .controller('HomeController', ['$scope', 'news', function($scope, news) {
  	$scope.news = news;
  }]);