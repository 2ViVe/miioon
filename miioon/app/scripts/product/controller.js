'use strict';

angular.module('2ViVe')
  .controller('ProductController', ['$scope', 'Product', '$routeParams',
    function($scope, Product, $routeParams) {
      var productId = $routeParams.productId;
      Product.getById(productId).success(function(data) {
        $scope.product = data.response;
      });
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
