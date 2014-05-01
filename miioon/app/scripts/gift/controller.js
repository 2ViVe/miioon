'use strict';

angular.module('2ViVe')
  .controller('GiftController', ['$scope', '$modal', 'GiftCard',
    function($scope, $modal, GiftCard) {
      var giftCard = new GiftCard();
      giftCard.fetch.success(function() {
        $scope.giftCards = giftCard.data.variants;
      });

      $scope.preview = function() {
        $modal.open({
          templateUrl: 'views/gift/gift-preview.html',
          controller: 'GiftModalController'
        });
      };

      $scope.tabs = [
        {
          title: 'Email',
          url: 'views/gift/email.html'
        },
        {
          title: 'Post',
          url: 'views/gift/post.html'
        }
      ];
    }
  ]
);



