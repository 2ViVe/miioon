'use strict';

angular.module('2ViVe')
  .controller('GiftController', ['$scope',
    function($scope) {
      // images switching
  
      $scope.giftImagesBig='images/gift/gift-img-big-1.jpg';
      $scope.giftImagesIndex = '1';
      $scope.switchGiftImages = function(target){
        $scope.giftImagesIndex = target.getAttribute('data');
        $scope.giftImagesBig = 'images/gift/gift-img-big-' + $scope.giftImagesIndex + '.jpg';
      }
      
      //tabs
      $scope.tabs = [{
        'title': 'EMAIL',
        //'content': 'email.html'
        url: "email.html"
        }, {
          'title': 'POST',
          //'content': 'post.html'
          url: 'post.html'
        }];
      }]
    );



