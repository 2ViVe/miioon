'use strict';

angular.module('2ViVe')
  .controller('GiftController', ['$scope',
    function($scope) {
      $scope.tabs = [{
        'title': 'EMAIL',
        //'content': 'email.html'
        url: "email.html"
      }, {
        'title': 'POST',
        //'content': 'post.html'
        url: 'post.html'
      }];
    }]);



