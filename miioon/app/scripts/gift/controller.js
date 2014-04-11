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
        url: 'views/gift/email.html'
        }, {
          'title': 'POST',
          url: 'views/gift/post.html'
        }];
      }
    ]
  );



