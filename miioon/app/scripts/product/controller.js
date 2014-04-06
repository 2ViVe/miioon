'use strict';

angular.module('2ViVe')
  .controller('ProductController', ['$scope',
    function($scope) {
      $scope.tabs = [{
        'title': 'Product Description',
        'content': 'Product Description Product Description Product Description'
      }, {
        'title': 'Size Charts',
        'content': 'Size Charts Size Charts Size Charts Size Charts'
      }, {
        'title': 'Video',
        'content': 'Video Video Video Video'
      }];
    }]);
